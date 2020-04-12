import { Component } from "@angular/core";
import SuggestionsAPIService from "src/app/services/api/suggestions/suggestions-api.service";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { OnInit } from "@angular/core";
import { Roles } from "src/app/utils/roles.enum.event";
import { Subscription } from "rxjs";
import { CurrentRoleViewService } from "src/app/services/observables/current-role-view.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-suggestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage implements OnInit {

  private pageTitle = "Suggested Matches";

  private currentRoleView: Roles;
  private currentRoleViewSubscription: Subscription;

  cards: IReturnedUserResponse[] = [];
  currentlyViewedCards: IReturnedUserResponse[] = [];
  loading: boolean = true;

  constructor(private suggestionsService: SuggestionsAPIService,  private errorToastService: ErrorToastService, private toastController: ToastController, 
    private currentRoleViewService: CurrentRoleViewService, private loadingController: LoadingController, private router: Router) {
    this.currentRoleViewSubscription = this.currentRoleViewService.getSubject().subscribe( currentRoleView => this.roleFilterUpdated(currentRoleView));
  }

  ngOnInit() {
    this.currentRoleView = this.currentRoleViewService.getCurrentRoleView();
    this.loadSuggestionCards();
  }

  async loadSuggestionCards() {
    this.loading = true;
    this.presentLoading();
    try {
      const response = await this.suggestionsService.GetSuggestions();

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      }
      this.cards = response.payload;
      this.filterCardsByRole();
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
    
    this.dismissLoading();
  }

  async sendChoice(event: ISuggestionsEvent) { 
    try {
      const response = await this.suggestionsService.RespondToSuggestion(event.card.id, event.liked);

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      }

      if (response.payload.didMatch) {
        this.displayMatch(event.card);
      }

      this.cards = this.cards.filter(x => x.id !== event.card.id);

    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
  }

  async displayMatch(match: IReturnedUserResponse) {
    const matchToast = await this.toastController.create({
      duration: 6000,
      position: "middle",
      color: "tertiary",
      showCloseButton: true,
      header: "New match: " + match.name + "!",
      buttons: [
        {
          side: "end",
          text: "View Profile",
          handler: () => {
            this.router.navigate(["/account-page"], {state: {data: match}});
          }
        }
      ]
    });
    matchToast.present();
  }

  filterCardsByRole() {
    this.currentlyViewedCards = this.cards.filter( x => x.role === this.currentRoleView);
  }

  roleFilterUpdated(newRoleFilter: Roles) {
    this.currentRoleView = newRoleFilter;
    this.filterCardsByRole();
  }

  async presentLoading() {
    return await this.loadingController.create({
      message: "Loading suggestions...",
      cssClass: "custom-loader"
    }).then(a => {
      a.present().then(() => {
        if (!this.loading) {
          a.dismiss();
        }});
      });
  }

  async dismissLoading() {
    this.loading = false;
    return await this.loadingController.dismiss();
  }

}
