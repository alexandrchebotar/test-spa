import {
  END_SEARCH_PLAYERS,
  CLEAR_SEARCH,
  CLEAR_SEARCH_FILTER,
  MARK_NEWS,
} from '../common/constants';
import {createAction} from 'redux-actions';
// import coursesJSON from './courses.json';
// import studentsJSON from './students.json';


export const endSearchPlayers = createAction(END_SEARCH_PLAYERS, (players) => ({
  search: {players},
  loading: {transfers: false},
}));
export const clearSearch = createAction(CLEAR_SEARCH, () => ({
  search: {clubs: [], players: []},
}));
export const clearSearchFilter = createAction(CLEAR_SEARCH_FILTER, () => ({
  search: {filter: []},
}));
export const markNews = createAction(MARK_NEWS, (news) => ({
  currentClub: {news},
}));

export const initApp = () => {
  return (dispatch, getState) => {
    // thunk initApp

    // get menu data

    // send all init data to store  
    dispatch(endSearchPlayers({
    }));

  };
};
