import { Component } from "@angular/core";
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage {

  sub: Subscription;

  constructor(private platform: Platform) {
     
  }

  ionViewDidEnter() {
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => { });
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
