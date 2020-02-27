import { Component } from "@angular/core";

@Component({
  selector: "app-sugestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage {

  private pageTitle = "Suggested Matches";

  cards = [];

  constructor() {
    this.loadSuggestionCards();
  }

  loadSuggestionCards() {
    this.cards = [
      {
        name: "Boris"
      },
      {
        name: "Bill"
      },
      {
        name: "Mandy"
      },
      {
        name: "Dehierdra"
      },
      {
        name: "Mr Krabs"
      },
      {
        name: "Aids Boi"
      },
      {
        name: "Lol Cats"
      },
    ]
  }

}
