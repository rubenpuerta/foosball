import { createReducer, on } from '@ngrx/store';
import { getPlayersStart, getPlayersSuccess } from '../actions/player.action';
import {
  getMatchesRequestStart,
  getMatchesRequestSuccess
} from '../actions/match-request.action';

export interface AppStatusState {
  isPlayersLoading: boolean;
  isMatchesLoading: boolean;
}

export const appStatusInitialState: AppStatusState = {
  isPlayersLoading: false,
  isMatchesLoading: false
};

export const appStatusReducer = createReducer(
  appStatusInitialState,
  on(getPlayersStart, (state: AppStatusState) => ({
    ...state,
    isPlayersLoading: true
  })),
  on(getMatchesRequestStart, (state: AppStatusState) => ({
    ...state,
    isMatchesLoading: true
  })),
  on(getPlayersSuccess, (state: AppStatusState) => ({
    ...state,
    isPlayersLoading: false
  })),
  on(getMatchesRequestSuccess, (state: AppStatusState) => ({
    ...state,
    isMatchesLoading: false
  }))
);
