import { IAPIResponse } from "src/app/models/response/api-response.interface";
import HTTPAbstract from "../http/http.abstract";
import IHTTPResponse from "../http/http-response.interface";
import { environment } from "src/environments/environment";

export default abstract class APIService {
  protected baseURI = environment.apiEndPoint + "/api/v1/";
  protected headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*"
  };

  constructor(private http: HTTPAbstract, domain: string) {
    this.baseURI += domain;
  }

  protected async post<T>(endpoint: string, payload: object): Promise<IAPIResponse<T>> {
      const response: IHTTPResponse = await this.http.post(this.baseURI + endpoint, payload, this.headers);
      return {
        statusCode: response.statusCode,
        errors: response.body ? response.body.errors : [],
        payload: response.body ? response.body.payload : {}
      };
  }
} 
