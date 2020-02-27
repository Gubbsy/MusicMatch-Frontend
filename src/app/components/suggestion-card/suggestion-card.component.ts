import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";

@Component({
  selector: "app-suggestion-card",
  templateUrl: "./suggestion-card.component.html",
  styleUrls: ["./suggestion-card.component.scss"],
})
export class SuggestionCardComponent implements OnInit, AfterViewInit {

  @Input() cards: Array<{
    name: string;
  }>;

  @ViewChildren("suggestionCard") suggestionCards: QueryList<ElementRef>;

  suggestionCardsArray: Array<ElementRef>;

  constructor() { }
  
  ngAfterViewInit() {
    this.suggestionCardsArray = this.suggestionCards.toArray();
    this.suggestionCards.changes.subscribe(() => 
      this.suggestionCardsArray = this.suggestionCards.toArray());
  }
  
  ngOnInit() {}

}
