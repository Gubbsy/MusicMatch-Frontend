
import { Injectable, Inject } from "@angular/core";
import HTTPAbstract from "../../http/http.abstract";
import APIService from "../api-service.abstarct";
import { IAPIResponse } from "src/app/models/response/api-response.interface";
import { ICreateAccountRequest } from "src/app/models/request/account/ICreateAccountRequest";
import { ISignInRequest } from "src/app/models/request/account/ISignInRequest";
import IEmptyResponse from "src/app/models/response/IEmptyResponse";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";
import IUpdateAccountDetailsRequest from "src/app/models/request/account/IUpdateAccountDetailsRequest";
import ILoggedInUserResponse from "src/app/models/response/account/ILoggedInUserResponse";

@Injectable({
  providedIn: "root"
})

export default class AccountAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "account/");
  }

  async createAccount(accountRole: string, username: string, email: string, password: string): Promise<IAPIResponse<IEmptyResponse>> {
      const payload: ICreateAccountRequest = {
        accountRole: accountRole,
        username: username,
        email: email,
        password: password,
      };
    return await this.post<IEmptyResponse>("createaccount", payload);
  }

  async signIn(credential: string, password: string): Promise<IAPIResponse<ILoggedInUserResponse>> {
    const payload: ISignInRequest = {
      credential: credential,
      password: password
    };
    
    return await this.post<ILoggedInUserResponse>("signin", payload);
  }

  async signOut(): Promise<IAPIResponse<IEmptyResponse>> {
    return await this.post<IEmptyResponse>("signout", null);
  }

  async getAccountDetails(): Promise<IAPIResponse<IAccountDetailsResponse>> {
    
    return await this.post<IAccountDetailsResponse>("getaccountdetails", null);
  }

  async updateAccountDetails(genres: string[], venues: string[], name: string, picture: string,
    bio: string, lookingFor: string, matchRadius: number, lat: number, lon: number): Promise<IAPIResponse<IEmptyResponse>> {
    const payload: IUpdateAccountDetailsRequest = {
      genres: genres,
      venues: venues,
      name: name,
      picture: picture,
      bio: bio,
      lookingFor: lookingFor,
      matchRadius: matchRadius,
      lat: lat,
      lon: lon,
    };

    return await this.post<IEmptyResponse>("updateaccountdetails", payload);
  }

}
