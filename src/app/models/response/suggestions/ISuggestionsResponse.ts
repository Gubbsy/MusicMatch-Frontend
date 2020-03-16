interface ISuggestionsResponse {
  id: string;
  name: string;
  distance: number;
  bio: string;
  lookingFor: string;
  genres: string[];
  venues: string[];
  role: string;
}
