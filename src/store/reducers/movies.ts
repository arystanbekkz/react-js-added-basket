import {
  MovieActionType,
  MovieState,
  MovieAction
} from "../../types/movieTypes";
import { Reducer } from "redux";

const initState: MovieState = {
  movies: [],
  query: "",
  pageInfo: {
    page: 1,
    total_pages: 0
  },
  sortBy: "popularity.desc"
};
export const movies: Reducer<MovieState, MovieAction> = (
  state = initState,
  action
) => {
  const newState = { ...state };

  switch (action.type) {
    case MovieActionType.SET_MOVIES:
      newState.movies = action.payload;
      break;
    case MovieActionType.SET_MOVIES_PAGE_INFO:
      newState.pageInfo = action.payload;
      break;
    case MovieActionType.SET_MOVIES_QUERY:
      newState.query = action.payload;
      break;
    case MovieActionType.SET_MOVIES_SORT_BY:
      newState.sortBy = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};
