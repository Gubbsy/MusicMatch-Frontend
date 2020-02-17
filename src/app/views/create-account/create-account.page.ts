import { Component, OnInit } from "@angular/core";
import AccountAPIService from 'src/app/services/api/account/account-api-service';

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
})
export class CreateAccountPage implements OnInit {
  
  accountRole: string = "Artist";
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;

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
  
  loading: boolean = false;

  constructor(private accountAPIService: AccountAPIService) { }

  ngOnInit() {
  }

  changeRole(event) {
    this.accountRole = event.target.value;
    console.log("Role ", this.accountRole);
  }

  async createAccountPressed() {
    console.log("Entered Values: " 
    + "\nRole " + this.accountRole
    + "\nUsername " + this.username
    + "\nemail " + this.email
    + "\npassword " + this.password
    + "\nconfirmed password " + this.confirmedPassword
    + "\nname " + this.name
    + "\ngenres " + this.genres
    + "\nvenues " + this.venues
    + "\nbio" + this.bio
    + "\nlooking for" + this.lookingFor
    + "\nmatch radius " + this.matchRadius);

    await this.accountAPIService.createAccont(this.accountRole, this.username, this.email, this.password, this.name,
      this.lat, this.lon, this.bio, this.lookingFor, this.genres, this.venues, this.matchRadius);
  }

}
