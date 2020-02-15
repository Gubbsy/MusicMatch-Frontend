import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
})
export class CreateAccountPage implements OnInit {

  loading: boolean = false;
  genres = [];
  existingGenres = [
    "Rock",
    "Reggea",
    "Rasta",
    "Metal",
    "Punk",
    "Screamo"
  ];

  venues = [];
  existingVenues = [
    "The Cavern - Exeter",
    "New Quay Inn - Teignmouth",
    "The Pigs Nose",
    "Blue Anchor",
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
