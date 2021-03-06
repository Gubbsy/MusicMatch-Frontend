import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";

@Component({
  selector: "app-suggestion-card",
  templateUrl: "./suggestion-card.component.html",
  styleUrls: ["./suggestion-card.component.scss"],
})
export class SuggestionCardComponent implements OnInit, AfterViewInit {

  @Input() cards: IReturnedUserResponse[] = [];

  @ViewChildren("suggestionCard") suggestionCards: QueryList<ElementRef>;
  suggestionCardsArray: Array<ElementRef>;

  @Output() choiceMade = new EventEmitter();

  moveOutWidth: number; // value in pixels that a card needs to travel to dissapear from screen
  shiftRequired: boolean; // state variable that indicates we need to remove the top card of the stack
  transitionInProgress: boolean; // state variable that indicates currently there is transition on-going
  heartVisible: boolean;
  crossVisible: boolean;

  fabRadius: string = "60px";
  fontSize: string = "1.1em";
  tagsMaxHeight: string = "48px";
  lineClamp: string = "5";

  constructor(private renderer: Renderer2, private router: Router) { 
    const height = window.innerHeight;
    if (height <= 660) {
      this.fabRadius = "50px";
      this.tagsMaxHeight = "21px";
      this.fontSize = "0.9em";
      this.lineClamp = "3";
    }

    document.body.style.setProperty("--fab-radius", this.fabRadius);
    document.body.style.setProperty("--tags-max-height", this.tagsMaxHeight);
    document.body.style.setProperty("--font-size", this.fontSize);
    document.body.style.setProperty("--line-clamp", this.lineClamp);

    console.log(height);
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) { return false; }
    if (heart) {
      this.renderer.setStyle(this.suggestionCardsArray[0].nativeElement, "transform", "translate(" + this.moveOutWidth + "px, -100px) rotate(-30deg)");
      this.toggleChoiceIndicator(false, true);
      this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(this.suggestionCardsArray[0].nativeElement, "transform", "translate(-" + this.moveOutWidth + "px, -100px) rotate(30deg)");
      this.toggleChoiceIndicator(true, false);
      this.emitChoice(heart, this.cards[0]);
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  handlePan(event) {

    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) { return; }

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.suggestionCardsArray[0].nativeElement, "moving");

    if (event.deltaX > 0) { this.toggleChoiceIndicator(false, true); }
    if (event.deltaX < 0) { this.toggleChoiceIndicator(true, false); }

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    this.renderer.setStyle(this.suggestionCardsArray[0].nativeElement, "transform", "translate(" + event.deltaX + "px, " + event.deltaY + "px) rotate(" + rotate + "deg)");

    this.shiftRequired = true;

  }

  handlePanEnd(event) {

    this.toggleChoiceIndicator(false, false);

    if (!this.cards.length) { return; }

    this.renderer.removeClass(this.suggestionCardsArray[0].nativeElement, "moving");

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.suggestionCardsArray[0].nativeElement, "transform", "");
      this.shiftRequired = false;

    } else {

      const endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      this.renderer.setStyle(this.suggestionCardsArray[0].nativeElement, "transform", "translate(" + toX + "px, " + (toY + event.deltaY) + "px) rotate(" + rotate + "deg)");

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.cards.shift();
    }
  }

  emitChoice(heart, card) {
    const payload: ISuggestionsEvent = {
      liked: heart,
      card: card
    };
    this.choiceMade.emit(payload);
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.suggestionCardsArray = this.suggestionCards.toArray();
    this.suggestionCards.changes.subscribe(() => {
      this.suggestionCardsArray = this.suggestionCards.toArray();
    });
  }

  viewAccountPage() {
    this.router.navigate(["/account-page"], {state: {data: this.cards[0]}});
  }

  ngOnInit() {}

}
