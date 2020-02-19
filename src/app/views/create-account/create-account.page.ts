import { Component, OnInit } from "@angular/core";
import AccountAPIService from "src/app/services/api/account/account-api-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
})
export class CreateAccountPage implements OnInit {

  constructor(private accountAPIService: AccountAPIService, private formBuilder: FormBuilder, public toastController: ToastController) {}

  get username() {
    return this.createAccountForm.get("username");
  }

  get email() {
    return this.createAccountForm.get("email");
  }

  get password() {
    return this.createAccountForm.get("password");
  }

  get confirmedPassword() {
    return this.createAccountForm.get("confirmedPassword");
  }
  
  accountRole: string = "Artist";

  // genres: string[] = [] ;
  // existingGenres: string[] = [
  //   "Rock",
  //   "Reggea",
  //   "Rasta",
  //   "Metal",
  //   "Punk",
  //   "Screamo"
  // ];

  // venues: string[] = [];
  // existingVenues: string[] = [
  //   "The Cavern - Exeter",
  //   "New Quay Inn - Teignmouth",
  //   "The Pigs Nose",
  //   "Blue Anchor",
  // ];

  // lat: number = 10.123;
  // lon: number = 100.123;
  // name: string;
  // bio: string;
  // lookingFor: string;
  // matchRadius: number;
  
  loading: boolean = false;
  
  createAccountForm = this.formBuilder.group({
    username: ["", Validators.required], 
    email: ["", 
      [Validators.required, Validators.email]
    ],
    password: ["", Validators.required],
    confirmedPassword: ["", Validators.required]
  });
  
  errorMessages = {
    username: [
      { type: "required", message: "Name is required" },
      { type: "maxlength", message: "Name cant be longer than 100 characters" }
    ],
    email: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "Please enter a valid email address" }
    ],
    password: [
      { type: "required", message: "Password is required" },
      { type: "minlength", message: "Password must be at least 8 characters" }
    ],
    confirmedPassword: [
      { type: "required", message: "Please confirm password" },
    ],
  };

  ngOnInit() {
  }

  changeRole(event) {
    this.accountRole = event.target.value;
    console.log("Role ", this.accountRole);
  }

  async submit() {
    console.log(this.createAccountForm.value);
    if (this.createAccountForm.controls["password"].value !== this.createAccountForm.controls["confirmedPassword"].value) {
      this.showMultipleToast("Passwors must match");
    } else {
      const result = await this.accountAPIService.createAccont(this.accountRole, this.createAccountForm.controls["username"].value, this.createAccountForm.controls["email"].value, this.createAccountForm.controls["password"].value);
      
      if ((result.errors !== null || result !== undefined) &&  result.errors.length > 0 ) {
        result.errors.forEach(e => {
          this.showMultipleToast(e);
        });
      } else {
        console.log("Successsfuly created account");
      }
    }
  }

  showMultipleToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 30000,
      animated: true,
      showCloseButton: true,
      closeButtonText: "Done",
      color: "danger"
    }).then((mobj) => {
      mobj.present();
    });
  }

}
