import { Component } from "@angular/core";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";
import SuggestionsAPIService from "src/app/services/api/suggestions/suggestions-api.service";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-sugestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage {

  private pageTitle = "Suggested Matches";

  private currentRoleView = "artist";

  cards: ISuggestionsResponse[];
  currentlyViewedCards: ISuggestionsResponse[];

  constructor(private suggestionsService: SuggestionsAPIService,  private errorToastService: ErrorToastService, private toastController: ToastController) {
    this.loadSuggestionCards();
  }

  async loadSuggestionCards() {
    try {
      const response = await this.suggestionsService.GetSuggestions();

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      }
      this.cards = response.payload;
      this.currentlyViewedCards = this.cards.filter(x => x.role === this.currentRoleView);
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }

    console.log(this.cards);
  }

  async sendChoice(event: ISuggestionsEvent) { 
    console.log(event.liked, event.card);
    try {
      const response = await this.suggestionsService.RespondToSuggestion(event.card.id, event.liked);

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      }
      console.log("Did Match: ", response.payload.didMatch);

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

  toggleViewingRole(ev: any) {
    this.currentRoleView =  ev.detail.value;
    this.currentlyViewedCards = this.cards.filter( x => x.role === this.currentRoleView);
  }

}
