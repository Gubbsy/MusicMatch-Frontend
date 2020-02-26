import { Injectable, Inject } from "@angular/core";
import HTTPAbstract from "../../http/http.abstract";
import APIService from "../api-service.abstarct";
import { IAPIResponse } from "src/app/models/response/api-response.interface";

@Injectable({
  providedIn: "root"
})

export default class VenuesAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "venues/");
  }

  async GetAllGenres(): Promise<IAPIResponse<IVenuesResponse>> {

    return await this.post<IVenuesResponse>("getallvenues", null);
  }

}
