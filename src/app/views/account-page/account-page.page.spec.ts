import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { AccountPagePage } from "./account-page.page";

describe("AccountPagePage", () => {
  let component: AccountPagePage;
  let fixture: ComponentFixture<AccountPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
