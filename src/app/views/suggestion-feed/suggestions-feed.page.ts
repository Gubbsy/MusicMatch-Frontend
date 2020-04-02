import { Component } from "@angular/core";
import SuggestionsAPIService from "src/app/services/api/suggestions/suggestions-api.service";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { OnInit } from "@angular/core";
import { Roles } from "src/app/utils/roles.enum.event";
import { Subscription } from "rxjs";
import { CurrentRoleViewService } from "src/app/services/observables/current-role-view.service";

@Component({
  selector: "app-suggestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage implements OnInit {

  private pageTitle = "Suggested Matches";
  private loading: boolean = true;

  private currentRoleView: Roles;
  private currentRoleViewSubscription: Subscription;

  cards: IReturnedUserResponse[];
  currentlyViewedCards: IReturnedUserResponse[];

  constructor(private suggestionsService: SuggestionsAPIService,  private errorToastService: ErrorToastService, private toastController: ToastController, 
    private currentRoleViewService: CurrentRoleViewService, private loadingController: LoadingController) {
    this.currentRoleViewSubscription = this.currentRoleViewService.getSubject().subscribe( currentRoleView => this.roleFilterUpdated(currentRoleView));
    this.loadSuggestionCards();
  }

  ngOnInit() {
    this.currentRoleView = this.currentRoleViewService.getCurrentRoleView();
  }

  async loadSuggestionCards() {
    this.present();
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
    
    this.dismiss();
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
        this.displayMatch(event.card.name);
      }

      this.cards = this.cards.filter(x => x.id !== event.card.id);

    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
  }

  async displayMatch(matchName: string) {
    const matchToast = await this.toastController.create({
      message: "You've matched with " + matchName + "!",
      duration: 4000,
      showCloseButton: true,
      position: "middle",
      color: "tertiary"
    });
    matchToast.present();
  }

  filterCardsByRole() {
    this.currentlyViewedCards = this.cards.filter( x => x.role === this.currentRoleView);
  }

  roleFilterUpdated(newRoleFilter: Roles) {
    this.currentRoleView = newRoleFilter;
    this.loadSuggestionCards();
    this.filterCardsByRole();
  }

  async present() {
    this.loading = true;
    return await this.loadingController.create({
      message: "Loading suggestions...",
    }).then(a => {
      a.present().then(() => {
        if (!this.loading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.loading = false;
    return await this.loadingController.dismiss();
  }

}
