import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"],
})
export class PageHeaderComponent implements OnInit {

  constructor(private router: Router) { }
  
  @Input()
  private title: string;

  ngOnInit() {}

  viewProfile() {
    this.router.navigate(["profile-details"]);
    console.log("navigating to accout details");
  }
}
