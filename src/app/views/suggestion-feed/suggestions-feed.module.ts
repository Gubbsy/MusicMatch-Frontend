import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuggestionFeedPage } from "./suggestions-feed.page";
import { PageHeaderModule } from "src/app/components/page-header/page-header.module";
import { SuggestionCardModule } from "src/app/components/suggestion-card/suggestion-card.module";

@NgModule({
  imports: [
    PageHeaderModule,
    SuggestionCardModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: SuggestionFeedPage }])
  ],
  declarations: [SuggestionFeedPage]
})
export class SuggestionFeedModule {}
