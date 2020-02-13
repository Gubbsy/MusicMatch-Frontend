export interface IAPIResponse<T> {
  statusCode: number;
  errors: string[];
  payload: T;
}