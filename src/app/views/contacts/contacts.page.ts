import { Component, OnInit } from "@angular/core";
import MatchesAPIService from "src/app/services/api/matches/matches-api.service";
import ErrorToastService from "src/app/services/error-handling/error-toast.service";
import { CurrentRoleViewService } from "src/app/services/observables/current-role-view.service";
import { Roles } from "src/app/utils/roles.enum.event";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-contacts",
  templateUrl: "contacts.page.html",
  styleUrls: ["contacts.page.scss"]
})
export class ContactsPage implements OnInit {

  private pageTitle = "Contacts";
  matches: IReturnedUserResponse[] = [];
  currentlyViewedMatches: IReturnedUserResponse[] = [];
  currentRoleView: Roles;
  currentRoleViewSubscription: Subscription;

  constructor(private matchesAPIService: MatchesAPIService, private errorToastService: ErrorToastService, 
    private currentRoleViewService: CurrentRoleViewService, private router: Router) {
    this.currentRoleViewSubscription = this.currentRoleViewService.getSubject().subscribe( currentRoleView => this.roleFilterUpdated(currentRoleView));
  }

  ngOnInit(): void {
    this.currentRoleView = this.currentRoleViewService.getCurrentRoleView();
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
      this.filterContactsByRole();

    } catch {
      this.errorToastService.showMultipleToast("Oops something went wrong");
    }
  }
  
  filterContactsByRole() {
    this.currentlyViewedMatches = this.matches.filter( x => x.role === this.currentRoleView);
  }
  
  roleFilterUpdated(newRoleFilter: Roles) {
    this.currentRoleView = newRoleFilter;
    this.loadMatches();
    this.filterContactsByRole();
  }

  viewMatchProfile(match: IReturnedUserResponse) {
    setTimeout(() => {
      this.router.navigate(["/account-page"], {state: {data: match}}); } , 200);
  }

  messageMatch(match: IReturnedUserResponse) {
    setTimeout(() => {
      this.router.navigate(["/messaging"], {state: {data: match}}); } , 200);
  }
}
