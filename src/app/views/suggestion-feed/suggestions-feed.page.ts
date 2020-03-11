import { Component } from "@angular/core";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";
import SuggestionsAPIService from "src/app/services/api/suggestions/suggestions-api.service";

@Component({
  selector: "app-sugestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage {

  private pageTitle = "Suggested Matches";

  cards: ISuggestionsResponse[];

  constructor(private suggestionsService: SuggestionsAPIService) {
    this.loadSuggestionCards();
  }

  async loadSuggestionCards() {
    const response = await this.suggestionsService.GetSuggestions();
    //TODO: Error Checking

    this.cards = response.payload;
    console.log(this.cards);
  }

  logChoice(event) { 
    console.log(event);
  }

}
