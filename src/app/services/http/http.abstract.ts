import IHTTPResponse from "./http-response.interface";

export default abstract class HTTPAbstract {
    abstract post(url: string, body: object, headers: any): Promise<IHTTPResponse>;
}
