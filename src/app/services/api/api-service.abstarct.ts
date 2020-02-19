import { IAPIResponse } from "src/app/models/response/api-response.interface";
import HTTPAbstract from "../http/http.abstract";
import IHTTPResponse from "../http/http-response.interface";

export default abstract class APIService {
  protected baseURI = "https://localhost:44382/api/v1/";
  protected headers = {
    "Content-Type": "application/json"
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
