
import { Injectable, Inject } from "@angular/core";
import HTTPAbstract from "../../http/http.abstract";
import APIService from "../api-service.abstarct";
import { IAPIResponse } from "src/app/models/response/api-response.interface";
import { ICreateAccountRequest } from "src/app/models/request/account/ICreateAccountRequest";
import { ISignInRequest } from "src/app/models/request/account/ISignInRequest";
import IAccountDetailsRequest from "src/app/models/request/account/IAccountDetailsRequest";
import IEmptyResponse from "src/app/models/response/IEmptyResponse";
import IAccountDetailsResponse from "src/app/models/response/account/IAccountDetailsResponse";

@Injectable({
  providedIn: "root"
})

export default class AccountAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "account/");
  }

  async createAccont(accountRole: string, username: string, email: string, password: string): Promise<IAPIResponse<IEmptyResponse>> {
      const payload: ICreateAccountRequest = {
        accountRole: accountRole,
        username: username,
        email: email,
        password: password,
      };
    return await this.post<IEmptyResponse>("createaccount", payload);
  }

  async signIn(credential: string, password: string): Promise<IAPIResponse<IEmptyResponse>> {
    const payload: ISignInRequest = {
      credential: credential,
      password: password
    } 
    
    return await this.post<IEmptyResponse>("signin", payload);
  }

  async getAcountDetails(): Promise<IAPIResponse<IAccountDetailsResponse>> {
    
    return await this.post<IAccountDetailsResponse>("getaccountdetails", null);
  }
}
