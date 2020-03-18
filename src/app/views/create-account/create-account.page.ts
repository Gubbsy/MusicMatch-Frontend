import { Component, OnInit } from "@angular/core";
import AccountAPIService from "src/app/services/api/account/account-api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
})
export class CreateAccountPage implements OnInit {

  constructor(private router: Router, private accountAPIService: AccountAPIService, private formBuilder: FormBuilder, public errorToastService: ErrorToastService) {}

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
  }

  async submit() {
    this.loading = true;

    const eml = this.createAccountForm.controls["email"].value;
    const usrn = this.createAccountForm.controls["username"].value;
    const pswd = this.createAccountForm.controls["password"].value;
    const confPswd = this.createAccountForm.controls["confirmedPassword"].value;
    
    if (pswd !== confPswd) {
      this.errorToastService.showMultipleToast("Passwords must match");
    } else {
      const result = await this.accountAPIService.createAccont(this.accountRole, usrn, eml, pswd);
      
      if ((result.errors !== null || result !== undefined) &&  result.errors.length > 0 ) {
        result.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      } else {
        try {
          const res = await this.accountAPIService.signIn(usrn, pswd);
        
          if ((res.errors !== null || res !== undefined) &&  result.errors.length > 0 ) {
            res.errors.forEach(e => {
              this.errorToastService.showMultipleToast(e);
            });
          } else {
            this.router.navigate(["/tabs"]);
          }
        } catch {
            this.errorToastService.showMultipleToast("Unable to sign-in new user");
        } finally {
          this.loading = false;
        }
      }
    }
    this.loading = false;
  }

}
