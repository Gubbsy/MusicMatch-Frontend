import APIService from "../api-service.abstarct";
import HTTPAbstract from "../../http/http.abstract";
import { Inject, Injectable } from "@angular/core";
import { IAPIResponse } from "src/app/models/response/api-response.interface";

@Injectable({
  providedIn: "root"
})

export default class MatchesAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "matches/");
  }

  async GetMatches(): Promise<IAPIResponse<IReturnedUserResponse[]>> {
    return await this.post<IReturnedUserResponse[]>("getmatches", null);
  }

}
