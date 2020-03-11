import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuggestionCardComponent } from "./suggestion-card.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [ SuggestionCardComponent ],
  imports: [  
    CommonModule,
    IonicModule,
  ],
  exports: [ SuggestionCardComponent ]
})
export class SuggestionCardModule { }
