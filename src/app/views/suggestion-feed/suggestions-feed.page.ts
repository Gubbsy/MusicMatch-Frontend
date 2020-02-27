import { Component } from "@angular/core";
import IAccountDetailsResponse from 'src/app/models/response/account/IAccountDetailsResponse';

@Component({
  selector: "app-sugestions",
  templateUrl: "suggestions-feed.page.html",
  styleUrls: ["suggestions-feed.page.scss"]
})
export class SuggestionFeedPage {

  private pageTitle = "Suggested Matches";

  cards: IAccountDetailsResponse[] = [];

  constructor() {
    this.loadSuggestionCards();
  }

  loadSuggestionCards() {
    this.cards = [
      {
        name: "Violet Eye",
        bio: "We're an up-and-coming alrt-rock/grunge band from Teignmouth. With a pastion for hard hittign riffs and head banging bass, we'll be sure to knock your socks off ",
        lookingFor: "We're looking to link up with new bands to support us in our ever-growing gig portfolio. As well as new giging opertunities and venues to work with.",
        genres: ["Alt-rock", "Grunge", "Nu-Metal", "Punk"],
        venues: ["The nags head", "The Blue Anchor", "Moloys Tavern"],
        lat: 50.123132,
        lon: 0.123,
        matchRadius: 50,
      }, 
      {
        name: "Boris",
        bio: "This is ma bio",
        lookingFor: "I'm looking for friends",
        genres: ["Pop", "Rock"],
        venues: ["The nags head"],
        lat: 50.123132,
        lon: 0.123,
        matchRadius: 0.123,
      }, 
      {
        name: "Boris",
        bio: "This is ma bio",
        lookingFor: "I'm looking for friends",
        genres: ["Pop", "Rock"],
        venues: ["The nags head"],
        lat: 50.123132,
        lon: 0.123,
        matchRadius: 0.123,
      }, 
      {
        name: "Boris",
        bio: "This is ma bio",
        lookingFor: "I'm looking for friends",
        genres: ["Pop", "Rock"],
        venues: ["The nags head"],
        lat: 50.123132,
        lon: 0.123,
        matchRadius: 0.123,
      }, 
    
    ]
  }

  logChoice(event){
    console.log(event);
  
  }

}
