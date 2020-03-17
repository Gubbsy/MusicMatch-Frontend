import { Component } from "@angular/core";
import MatchesAPIService from "src/app/services/api/matches/matches-api.service";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";

@Component({
  selector: "app-contacts",
  templateUrl: "contacts.page.html",
  styleUrls: ["contacts.page.scss"]
})
export class ContactsPage {

  private pageTitle = "Contacts";
  matches: IReturnedUserResponse[];

  constructor(private matchesAPIService: MatchesAPIService, private errorToastService: ErrorToastService) {
    this.loadMatches();
  }

  async loadMatches() {
    try {
      const response = await this.matchesAPIService.GetMatches();

      if ((response.errors !== null || response !== undefined) &&  response.errors.length > 0 ) {
        response.errors.forEach(e => {
          this.errorToastService.showMultipleToast(e);
        });
      }

      this.matches = response.payload;
    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
  }
  
}
