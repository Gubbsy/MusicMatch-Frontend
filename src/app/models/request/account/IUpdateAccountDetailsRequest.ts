export default interface IUpdateAccountDetailsRequest {
  genres: string[];
  venues: string[];
  name: string;
  picture: string,
  bio: string;
  lookingFor: string;
  matchRadius: number;
  lat: number;
  lon: number;
}
