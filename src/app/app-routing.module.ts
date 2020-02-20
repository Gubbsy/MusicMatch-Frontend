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
    path: "tabs",
    loadChildren: () => import("./views/tabs/tabs.module").then(m => m.TabsPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
