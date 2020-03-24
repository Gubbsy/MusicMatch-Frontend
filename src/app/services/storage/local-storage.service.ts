import { Injectable } from "@angular/core";
import ILoggedInUserResponse from "src/app/models/response/account/ILoggedInUserResponse";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  private userIdKey: string = "UserId";
  private usernameKey: string = "Username";
  private nameKey: string = "Name";

  constructor() {
  }

  saveUserCredentials(userId: string, username: string, name: string) {
    localStorage.setItem(this.userIdKey, userId);
    localStorage.setItem(this.usernameKey, username);
    localStorage.setItem(this.nameKey, name);
  }

  retrieveUserCredentials(): ILoggedInUserResponse {
    return {
      userId: localStorage.getItem(this.userIdKey),
      username: localStorage.getItem(this.usernameKey),
      name: localStorage.getItem(this.nameKey)
    };
  }
}
