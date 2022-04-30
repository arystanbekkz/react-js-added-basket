export enum MovieActionType {
  SET_MOVIES = "SET_MOVIES",
  SET_MOVIES_PAGE_INFO = "SET_MOVIES_PAGE_INFO",
  SET_MOVIES_QUERY = "SET_MOVIES_QUERY",
  SET_MOVIES_SORT_BY = "SET_MOVIES_SORT_BY"
}
export type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type PageInfo = {
  page: number;
  total_pages: number;
};
export type SortingTypes =
  | "popularity.desc"
  | "release_date.desc"
  | "vote_average.desc";
export type MovieState = {
  movies: Array<Movie>;
  query: string;
  pageInfo: PageInfo;
  sortBy: SortingTypes;
};
export type FetchMovieAction = {
  type: MovieActionType.SET_MOVIES;
  payload: Array<Movie>;
};
export type FetchMoviePageInfoAction = {
  type: MovieActionType.SET_MOVIES_PAGE_INFO;
  payload: PageInfo;
};
export type FetchMovieSetQueryAction = {
  type: MovieActionType.SET_MOVIES_QUERY;
  payload: string;
};
export type FetchMovieSortingAction = {
  type: MovieActionType.SET_MOVIES_SORT_BY;
  payload: SortingTypes;
};

export type MovieAction =
  | FetchMovieAction
  | FetchMoviePageInfoAction
  | FetchMovieSetQueryAction
  | FetchMovieSortingAction;
