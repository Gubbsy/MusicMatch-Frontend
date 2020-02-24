
import { Injectable, Inject } from "@angular/core";
import HTTPAbstract from "../../http/http.abstract";
import APIService from "../api-service.abstarct";
import { IAPIResponse } from "src/app/models/response/api-response.interface";
import { ICreateAccountResponse } from "src/app/models/response/account/ICreateAccountResponse";
import { ICreateAccountRequest } from "src/app/models/request/account/ICreateAccountRequest";
import { ISignInRequest } from "src/app/models/request/account/ISignInRequest";
import { ISignInResponse } from "src/app/models/response/account/ISignInRespone";
import IAccountDetailsRequest from 'src/app/models/request/account/IAccountDetailsRequest';

@Injectable({
  providedIn: "root"
})

export default class AccountAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "account/");
  }

  async createAccont(accountRole: string, username: string, email: string, password: string): Promise<IAPIResponse<ICreateAccountResponse>> {
      const payload: ICreateAccountRequest = {
        accountRole: accountRole,
        username: username,
        email: email,
        password: password,
      };
    return await this.post<ICreateAccountResponse>("createaccount", payload);
  }

  async signIn(credential: string, password: string): Promise<IAPIResponse<ISignInResponse>> {
    const payload: ISignInRequest = {
      credential: credential,
      password: password
    } 
    
    return await this.post<ISignInResponse>("signin", payload);
  }

  async getCountDetails(username: string): Promise<IAPIResponse<ICreateAccountResponse>> {
    const payload: IAccountDetailsRequest = {
      username: username
    }
    
    return await this.post<ICreateAccountResponse>("getaccountdetails", payload);
  }
}
