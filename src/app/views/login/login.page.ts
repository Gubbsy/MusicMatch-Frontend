import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import AccountAPIService from 'src/app/services/api/account/account-api-service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginComponent implements OnInit {


  credential: string;
  password: string;
  loginError: string;

  loading: boolean = false;

  constructor(private accountAPIService: AccountAPIService, private router: Router) {
    
  }

  ngOnInit() {
  }

  createAccountPressed() {
    this.router.navigate(["/create-account"]);
  }

  async signInPressed() {
    this.loginError = this.validate();
    
    if (!this.loginError) {
      this.loading = true;

      try {
        const response = await this.accountAPIService.signIn(this.credential, this.password);

        if (response.statusCode !== 200) {
          this.loginError = "Server error.";
          return;
        } 

        if (response.payload.role.length !== 1) {
          this.loginError = "Error, please contact application administrator.";
          return;
        }

        this.loginError = null;
        switch (response.payload.role[0]) {
          case "artist":
              localStorage.setItem("userEmail", this.credential);
              this.router.navigate(["/tabs"]);
              console.log("artist logged in");
            break;
            case "events manager":
              localStorage.setItem("userEmail", this.credential);
              this.router.navigate(["/tabs"]);
              console.log("evens manager logged in");
            break;
          default:
            this.loginError = "Error, role not recognised. Please contact application administrator";
        }
      } catch {
        this.loginError = "No account exists with these credentials";
      } finally {
        this.loading = false;
      }
    }
  }

  validate(): string {
    if (!this.credential || !this.password) {
      return "Please enter a username and password";
    }

    return null;
  }

}
