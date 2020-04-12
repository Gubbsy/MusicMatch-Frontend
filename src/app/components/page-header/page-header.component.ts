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

  toggleViewingRole(role: string) {
    if (role === Roles.ARTIST) {
      this.currentRoleViewService.setRoleView(Roles.ARTIST);
    } else if(role === Roles.EVENTS_MANAGER){
      this.currentRoleViewService.setRoleView(Roles.EVENTS_MANAGER);
    }
  }

  setCurrentRoleView(newRoleView: Roles) {
    this.currentRoleView = newRoleView;
  }
}
