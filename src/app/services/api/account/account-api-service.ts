
import { Injectable, Inject } from "@angular/core";
import HTTPAbstract from "../../http/http.abstract";
import APIService from "../api-service.abstarct";
import { IAPIResponse } from "src/app/models/response/api-response.interface";
import { ICreateAccountResponse } from "src/app/models/response/account/ICreateAccountResponse";
import { ICreateAccountRequest } from "src/app/models/request/account/ICreateAccountRequest";

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
}
