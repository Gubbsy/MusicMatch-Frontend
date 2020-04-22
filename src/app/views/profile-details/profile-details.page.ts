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
import { ActionSheetController } from "@ionic/angular";

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
  profilePic: string = "";
  postcode: string;

  geoOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  camOptions: CameraOptions = {
    allowEdit: true,
    correctOrientation: true,
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 400,
    targetHeight: 400,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  constructor(private location: Location, private geolocation: Geolocation, private nativeGeocoder: 
    NativeGeocoder, private accountAPIService: AccountAPIService, private errorToastService: ErrorToastService,
    private genreAPIService: GenresAPIService, private venuesAPIService: VenuesAPIService, private camera: Camera, private addPicActionSheet: ActionSheetController) { }

  async ngOnInit() {
    
    try {

      const details = await this.accountAPIService.getAccountDetails();
      const existingGenresRes = await this.genreAPIService.GetAllGenres();
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
        this.profilePic = details.payload.picture;
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

  getCurrentLocation() {
    this.locationLoading = true;
    this.geolocation.getCurrentPosition({timeout: 20000}).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.postCodeFromLatLon();
      this.locationLoading = false;
     }).catch((error) => {
       console.log("Error getting location", error);
       this.errorToastService.showMultipleToast("Unable to retrieve location. Please manually enter your postcode.");
       this.locationLoading = false;
     });
  }

  postCodeFromLatLon() {
    this.nativeGeocoder.reverseGeocode(this.lat, this.lon, this.geoOptions)
    .then((details: NativeGeocoderResult[]) => this.postcode = details[0].postalCode)
      .catch((error: any) => console.log(error));
  }

  async latLonFromPostCode() {

    return new Promise((resolve, reject) => {
      this.nativeGeocoder.forwardGeocode(this.postcode, { useLocale: true, maxResults: 1 })
        .then((details: NativeGeocoderResult[]) => {
          this.lat = Number(details[0].latitude);
          this.lon = Number(details[0].longitude);
          console.log(details);
          resolve(); 
        })
        .catch((error: any) => { 
          console.log(error);
          reject();
        });
    });
  }

  async saveChanges() {
    this.saving = true;
    await this.latLonFromPostCode();
    try {
      const response = await this.accountAPIService.updateAccountDetails(this.genres, this.venues, this.name, this.profilePic, this.bio, this.lookingFor, this.matchRadius, this.lat, this.lon);

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
      this.profilePic = imageData;
     }, (err) => {
      console.error("Error getting pic");
     });
  }

  async presentActionSheet() {
    const actionSheet = await this.addPicActionSheet.create({
      header: "Update Profile Picture",
      buttons: [
        {
          text: "Remove Picture",
          role: "destructive",
          icon: "close",
          handler: () => {
            this.profilePic = "";
          }
        },
        {
          text: "From Album",
          icon: "albums",
          handler: () => {
            this.camOptions.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
            this.setProfilePic();
          }
        }, {
          text: "From Camera",
          icon: "camera",
          handler: () => {
            this.camOptions.sourceType = this.camera.PictureSourceType.CAMERA;
            this.setProfilePic();
        }
      }]
    });
    await actionSheet.present();
  }
}
