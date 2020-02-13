import HTTPAbstract from "./http-service";
import IHTTPResponse from "./http-response.interface";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export default class HTTPCordova implements HTTPAbstract {

  constructor(private http: HttpClient) {
  }

  async post(url: string, body: object, headers: any): Promise<IHTTPResponse> {

    const result = await this.http.post(url, body, {
      headers: headers,
      withCredentials: true,
      observe: "response"
    }).toPromise();

    return {
      body: result.body,
      headers: result.headers,
      statusCode: result.status
    } as IHTTPResponse;
  }
}
