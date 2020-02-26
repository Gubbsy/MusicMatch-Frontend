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
        const result = await this.accountAPIService.signIn(this.credential, this.password);
      
        if ((result.errors !== null || result !== undefined) &&  result.errors.length > 0 ) {
          result.errors.forEach(e => {
            this.loginError = e;
          });
        } else {
          this.router.navigate(["/tabs"]);
        }
      } catch {
        this.loginError = "Unable to sign-in user";
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
