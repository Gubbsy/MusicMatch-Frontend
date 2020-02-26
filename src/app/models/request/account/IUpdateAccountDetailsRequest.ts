export default interface IUpdateAccountDetailsRequest {
  genres: string[];
  venues: string[];
  name: string;
  bio: string;
  lookingFor: string;
  matchRadius: number;
  lat: number;
  lon: number;
}
