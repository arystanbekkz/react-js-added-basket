import {
  Movies,
  SortingTypes,
  MovieAction,
  MovieActionType
} from "../../types/movieTypes";
import axios from "axios";
import { Dispatch } from "redux";

type Arguments = {
  query?: string;
  page?: number;
  sort?: SortingTypes;
};
export const fetchMovies = ({
  query,
  page = 1,
  sort = "popularity.desc"
}: Arguments = {}) => (dispatch: Dispatch<MovieAction>) => {
  let method = "discover";
  if (query && query.length > 0) {
    method = "search";
  }
  axios
    .get<Movies>(
      `https://api.themoviedb.org/3/${method}/movie?sort_by=${sort}&api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&query=${query}`
    )
    .then((res) => {
      dispatch({
        type: MovieActionType.SET_MOVIES,
        payload: res.data.results
      });
      dispatch({
        type: MovieActionType.SET_MOVIES_PAGE_INFO,
        payload: {
          page: res.data.page,
          total_pages: Math.min(res.data.total_pages, 500)
        }
      });
    });
};
