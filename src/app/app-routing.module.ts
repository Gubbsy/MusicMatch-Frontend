import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./views/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "create-account",
    loadChildren: () => import("./views/create-account/create-account.module").then(m => m.CreateAccountPageModule)
  },
  {
    path: "profile-details",
    loadChildren: () => import("./views/profile-details/profile-details.module").then( m => m.ProfileDetailsPageModule)
  },
  {
    path: "tabs",
    loadChildren: () => import("./views/tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "account-page",
    loadChildren: () => import("./views/account-page/account-page.module").then( m => m.AccountPagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
