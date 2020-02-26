import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-suggestion-card",
  templateUrl: "./suggestion-card.component.html",
  styleUrls: ["./suggestion-card.component.scss"],
})
export class SuggestionCardComponent implements OnInit {

  constructor(private router: Router) { }
  
  @Input()
  private title: string;

  ngOnInit() {}

}
