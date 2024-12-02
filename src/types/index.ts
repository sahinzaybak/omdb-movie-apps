export interface Movie {
  Poster: string;
  Title: string;
  ImdbID: number;
  Year: string;
}

export interface MovieDetail {
  Poster: any;
  Title: string;
  Plot: number;
  imdbVotes: string;
  Type:string;
  Actors:string,
  Year: string,
  Runtime:string,
  Director:string,
  imdbRating:number,
  Country:string,
  Released:string
}

export interface MovieState {
  movies: Movie[];
  loading: boolean,
  currentYear: string,
  currentMediaType?: 'movie' | 'series' | 'episode';
  activePage: number,
  searchedMovieImdbId:string,
  movieDetail: MovieDetail,
  movieSlice?: {
    movies: Movie[];
    loading: boolean;
    currentYear: string;
    currentMediaType?: 'movie' | 'series' | 'episode';
    activePage: number;
  };
}

export const initialState: MovieState = {
  movies: [],
  loading: false,
  currentYear: null,
  currentMediaType: "movie",
  activePage: 1,
  movieDetail: null,
  searchedMovieImdbId:""
};


