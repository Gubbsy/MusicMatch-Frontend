import { Injectable, Inject } from "@angular/core";
import APIService from "../api-service.abstarct";
import HTTPAbstract from "../../http/http.abstract";
import { IAPIResponse } from "src/app/models/response/api-response.interface";

@Injectable({
  providedIn: "root"
})

export default class GenresAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "genres/");
  }

  async GetAllGenres(): Promise<IAPIResponse<IGenresResponse>> {

    return await this.post<IGenresResponse>("getallgenres", null);
  }

}
