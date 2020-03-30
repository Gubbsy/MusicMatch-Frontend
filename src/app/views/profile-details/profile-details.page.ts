import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import AccountAPIService from "src/app/services/api/account/account-api.service";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";
import VenuesAPIService from "src/app/services/api/venues/venues-api.service";
import GenresAPIService from "src/app/services/api/genres/genres-api.service";

@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.page.html",
  styleUrls: ["./profile-details.page.scss"],
})
export class ProfileDetailsPage implements OnInit {

  details: IAccountDetailsResponse;
  loading: boolean = true;
  locationLoading: boolean = false;
  saving: boolean = false;

  genres: string[] = [] ;
  existingGenres: string[] = [];

  venues: string[] = [];
  existingVenues: string[] = [];

  lat: number = 10.123;
  lon: number = 100.123;
  name: string;
  bio: string;
  lookingFor: string;
  matchRadius: number;

  postcode: string;

  geoOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  camOptions: CameraOptions = {
    allowEdit: true,
    correctOrientation: true,
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 400,
    targetHeight: 400,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  profilePic: string = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";

  constructor(private location: Location, private geolocation: Geolocation, private nativeGeocoder: 
    NativeGeocoder, private accountAPIService: AccountAPIService, private errorToastService: ErrorToastService,
    private genreAPIServce: GenresAPIService, private venuesAPIService: VenuesAPIService, private camera: Camera) { }

  async ngOnInit() {
    
    try {

      const details = await this.accountAPIService.getAcountDetails();
      const existingGenresRes = await this.genreAPIServce.GetAllGenres();
      const existingVenuesRes = await this.venuesAPIService.GetAllGenres();

      this.existingGenres = existingGenresRes.payload.genres;
      this.existingVenues = existingVenuesRes.payload.venues;

      if ((details.errors !== null || details !== undefined) &&  details.errors.length > 0 ) {
        details.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      } else {
        this.lat = details.payload.lat;
        this.lon = details.payload.lon;
        this.name = details.payload.name;
        this.bio = details.payload.bio;
        this.lookingFor = details.payload.lookingFor;
        this.matchRadius = details.payload.matchRadius;
        
        this.genres = details.payload.genres;
        this.venues = details.payload.venues;
        this.loading = false;
      }
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
  
    this.postCodeFromLatLon();
  }

  routeBack() {
    this.location.back();
  }

  getCurrentLocation() {
    this.locationLoading = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.postCodeFromLatLon();
      this.locationLoading = false;
     }).catch((error) => {
       console.log("Error getting location", error);
     });
  }

  postCodeFromLatLon() {
    this.nativeGeocoder.reverseGeocode(this.lat, this.lon, this.geoOptions)
    .then((details: NativeGeocoderResult[]) => this.postcode = details[0].postalCode)
      .catch((error: any) => console.log(error));
  }

  async saveChanges() {
    this.saving = true;
    try {
      const response = await this.accountAPIService.updateAccountDetails(this.genres, this.venues, this.name, this.bio, this.lookingFor, this.matchRadius, this.lat, this.lon);

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      }
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
    this.saving = false;
  }

  setProfilePic() {
    this.camera.getPicture(this.camOptions).then((imageData) => {
      const base64Image = "data:image/jpeg;base64," + imageData;
      this.profilePic = base64Image;
     }, (err) => {
      console.error("Error getting pic");
     });
  }
}
