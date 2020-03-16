import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuggestionFeedPage } from "./suggestions-feed.page";
import { PageHeaderModule } from "src/app/components/page-header/page-header.module";
import { SuggestionCardComponent } from 'src/app/components/suggestion-card/suggestion-card.component';

@NgModule({
  imports: [
    PageHeaderModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: SuggestionFeedPage }])
  ],
  declarations: [SuggestionFeedPage, SuggestionCardComponent ]
})
export class SuggestionFeedModule {}
