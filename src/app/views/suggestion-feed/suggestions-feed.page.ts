import { Component } from "@angular/core";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";
import SuggestionsAPIService from "src/app/services/api/suggestions/suggestions-api.service";
import ErrorToastService from 'src/app/services/error-handling/error-toast.service';

@Component({
  selector: "app-sugestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage {

  private pageTitle = "Suggested Matches";

  cards: ISuggestionsResponse[];

  constructor(private suggestionsService: SuggestionsAPIService,  private errorToastService: ErrorToastService) {
    this.loadSuggestionCards();
  }

  async loadSuggestionCards() {
    try {
      const response = await this.suggestionsService.GetSuggestions();

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      
      this.cards = response.payload;
      }
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }

    console.log(this.cards);
  }

  logChoice(event) { 
    console.log(event);
  }

}
