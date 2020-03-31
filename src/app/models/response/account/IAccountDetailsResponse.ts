export default interface IAccountDetailsResponse {
  name: string;
  picture: string;
  lat: number;
  lon: number;
  bio: string;
  lookingFor: string;
  genres: string[];
  venues: string[];
  matchRadius: number;
}
