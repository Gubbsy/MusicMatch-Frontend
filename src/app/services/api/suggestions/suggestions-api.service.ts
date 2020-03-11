import { Injectable, Inject } from "@angular/core";
import HTTPAbstract from "../../http/http.abstract";
import APIService from "../api-service.abstarct";
import { IAPIResponse } from "src/app/models/response/api-response.interface";

@Injectable({
  providedIn: "root"
})

export default class SuggestionsAPIService extends APIService {
  constructor(@Inject(HTTPAbstract) http: HTTPAbstract) {
    super(http, "suggestions/");
  }

  async GetSuggestions(): Promise<IAPIResponse<ISuggestionsResponse[]>> {
    return await this.post<ISuggestionsResponse[]>("getsuggestions", null);
  }

  async RespondToSuggestion(suggestedUserId: string, requestMatch: boolean): Promise<IAPIResponse<IRespondToSuggestionResponse>> {
    const payload: IRespondToSuggestionsRequest = {
      suggestedUserId: suggestedUserId,
      requestMatch: requestMatch
    };

    return await this.post<IRespondToSuggestionResponse>("respondtosuggestion", payload);
  }
}
