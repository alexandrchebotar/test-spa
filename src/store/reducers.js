import {
  END_SEARCH_PLAYERS,
  CLEAR_SEARCH,
  CLEAR_SEARCH_FILTER,
  MARK_NEWS,
} from 'common/constants';
import {combineReducers} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
import defaultState from './defaultState';

const courses = handleActions(
  {
    [combineActions(
      END_SEARCH_PLAYERS,
      CLEAR_SEARCH,
      CLEAR_SEARCH_FILTER,
      MARK_NEWS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.loading,
    }),
  },
  defaultState.loading
);
const students = handleActions(
  {
    [combineActions(
      END_SEARCH_PLAYERS,
      CLEAR_SEARCH,
      CLEAR_SEARCH_FILTER,
      MARK_NEWS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.loading,
    }),
  },
  defaultState.loading
);

export const appState = combineReducers({
  courses,
  students,
});
