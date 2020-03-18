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
    this.currentRoleViewSubscription = this.currentRoleViewService.getSubject().subscribe( newRoleView => this.setCurrentRoleView(newRoleView));
  }
  
  @Input()
  private title: string;

  ngOnInit() {
    this.currentRoleView = this.currentRoleViewService.getCurrentRoleView();
  }

  viewProfile() {
    this.router.navigate(["profile-details"]);
  }

  toggleViewingRole() {
    if (this.currentRoleView === Roles.ARTIST) {
      this.currentRoleViewService.setRoleView(Roles.EVENTS_MANAGER);
      this.currentRoleView = Roles.EVENTS_MANAGER;
    } else {
      this.currentRoleViewService.setRoleView(Roles.ARTIST);
      this.currentRoleView = Roles.ARTIST;
    }
  }

  setCurrentRoleView(newRoleView: Roles) {
    this.currentRoleView = newRoleView;
  }
}
