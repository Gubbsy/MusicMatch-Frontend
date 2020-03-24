import { Injectable } from "@angular/core";
import ILoggedInUserResponse from "src/app/models/response/account/ILoggedInUserResponse";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  constructor() {

  }

  saveUserCredentials(userId: string, userName: string, name: string) {
    localStorage.setItem("UserId", userId);
    localStorage.setItem("UserName", userName);
    localStorage.setItem("Name", name);
  }

  retrieveUserCredentials(): ILoggedInUserResponse {
    return {
      userId: localStorage.getItem("UserId"),
      userName: localStorage.getItem("UserName"),
      name: localStorage.getItem("Name")
    };
  }
}
