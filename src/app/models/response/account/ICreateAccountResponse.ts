export interface ICreateAccountResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  lat: number;
  lon: number;
  bio: string;
  lookingFor: string;
  genres: string[];
  venues: string[];
}
