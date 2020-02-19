import HTTPAbstract from "./http.abstract";
import IHTTPResponse from "./http-response.interface";
import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: "root"
})
export default class HTTPWeb implements HTTPAbstract {

  async post(url: string, body: object, headers: any): Promise<IHTTPResponse> {
  
    const result = async (): Promise<IHTTPResponse> => {

    const response = await axios.post(url, body, {
      withCredentials: true,
      validateStatus: (status) => true
    });

    return {
      body: response.data,
      headers: response.headers,
      statusCode: response.status
    };
      
    };

    const returnedResult = await result();

    return returnedResult;
  }
}
