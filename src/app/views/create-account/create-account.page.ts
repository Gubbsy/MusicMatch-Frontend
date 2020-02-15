import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
})
export class CreateAccountPage implements OnInit {
  
  accountRole: string;
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;

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

  name: string;
  bio: string;
  lookingFor: string;
  matchRadius: number;
  
  loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
