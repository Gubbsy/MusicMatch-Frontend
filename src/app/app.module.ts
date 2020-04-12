import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import HTTPWeb from "./services/http/http-web";
import HTTPAbstract from "./services/http/http.abstract";
import ErrorToastService from "./services/error-handling/error-toast.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule],
  providers: [
    ErrorToastService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTPAbstract,
      useFactory: (platform: Platform, client: HttpClient) => {
        if (platform.is("cordova")) {
          return new HTTPWeb();
        }
        
        return new HTTPWeb();
      },
      deps: [ Platform, HttpClient ]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
