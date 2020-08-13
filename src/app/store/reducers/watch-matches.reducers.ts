import { createReducer, on } from '@ngrx/store';
import {
  startWatchingFinishedMatches,
  stopWatchingFinishedMatches
} from '../actions/match-request.action';

export interface WatchMatchesState {
  hasToBeWatched: boolean;
}

const initialWatchMachestState: WatchMatchesState = { hasToBeWatched: false };

export const watchMatchesReducer = createReducer(
  initialWatchMachestState,
  on(startWatchingFinishedMatches, state => ({
    ...state,
    hasToBeWatched: true
  })),
  on(stopWatchingFinishedMatches, state => ({
    ...state,
    hasToBeWatched: false
  }))
);
