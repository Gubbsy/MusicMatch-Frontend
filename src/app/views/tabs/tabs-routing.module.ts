import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "suggestion-feed",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../suggestion-feed/suggestions-feed.module").then(m => m.SuggestionFeedModule)
          }
        ]
      },
      {
        path: "contacts",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../contacts/contacts.module").then(m => m.ContactsPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "suggestion-feed",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
