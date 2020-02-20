import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SuggestionFeedPage } from "./suggesion-feed.page";

describe("SuggestionFeedPage", () => {
  let component: SuggestionFeedPage;
  let fixture: ComponentFixture<SuggestionFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionFeedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
