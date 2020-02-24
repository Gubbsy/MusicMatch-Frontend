import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder/ngx";

@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.page.html",
  styleUrls: ["./profile-details.page.scss"],
})
export class ProfileDetailsPage implements OnInit {

  constructor(private location: Location, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { }

  locationLoading: boolean = false;

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

  postcode: string;

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

  ngOnInit() {
  }

  routeBack() {
    this.location.back();
  }

  getCurrentLocation() {
    this.locationLoading = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.nativeGeocoder.reverseGeocode(this.lat, this.lon, this.options)
        .then((result: NativeGeocoderResult[]) => this.postcode = result[0].postalCode)
          .catch((error: any) => console.log(error));
      this.locationLoading = false;
     }).catch((error) => {
       console.log("Error getting location", error);
     });
     
  }
  
}
