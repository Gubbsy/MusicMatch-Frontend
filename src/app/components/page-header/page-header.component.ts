import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CurrentRoleViewService } from "src/app/services/observables/current-role-view.service";
import { Roles } from "src/app/utils/roles.enum.event";
import { Subscription } from "rxjs";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"],
})
export class PageHeaderComponent implements OnInit {
  currentRoleView: Roles;
  currentRoleViewSubscription: Subscription;

  constructor(private router: Router, private currentRoleViewService: CurrentRoleViewService) { 
   
  }
  
  @Input()
  private title: string;

  ngOnInit() {
    this.currentRoleViewSubscription = this.currentRoleViewService.getSubject().subscribe( currentRoleView => this.currentRoleView = currentRoleView);
    this.currentRoleView = this.currentRoleViewService.getCurrentRoleView();
    console.log("Current role viewing on innit: ", this.currentRoleView);
  }

  viewProfile() {
    this.router.navigate(["profile-details"]);
  }

  toggleViewingRole() {
    if (this.currentRoleView === Roles.ARTIST) {
      this.currentRoleViewService.setRoleView(Roles.EVENTS_MANAGER);
    } else {
      this.currentRoleViewService.setRoleView(Roles.ARTIST);
    }

    console.log("Current Role View: ", this.currentRoleView);
    
  }
}
