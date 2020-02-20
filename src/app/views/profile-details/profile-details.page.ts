import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.page.html",
  styleUrls: ["./profile-details.page.scss"],
})
export class ProfileDetailsPage implements OnInit {

  constructor(private location: Location) { }

   genres: string[] = [] ;
  existingGenres: string[] = [
    "Rock",
    "Reggea",
    "Rasta",
    "Metal",
    "Punk",
    "Screamo"
  ];

  venues: string[] = [];
  existingVenues: string[] = [
    "The Cavern - Exeter",
    "New Quay Inn - Teignmouth",
    "The Pigs Nose",
    "Blue Anchor",
  ];

  lat: number = 10.123;
  lon: number = 100.123;
  name: string;
  bio: string;
  lookingFor: string;
  matchRadius: number;

  ngOnInit() {
  }

  routeBack() {
    this.location.back();
  }
  
}
