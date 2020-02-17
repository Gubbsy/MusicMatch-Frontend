export interface ICreateAccountRequest {
  accountRole: string;
  username: string;
  email: string;
  password: string;
  name: string;
  lat: number;
  lon: number;
  bio: string;
  lookingFor: string;
  genres: string[];
  venues: string[];
  matchRadius: number;
}
