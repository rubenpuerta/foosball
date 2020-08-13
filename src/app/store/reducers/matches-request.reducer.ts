import { createReducer, on } from '@ngrx/store';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import {
  getMatchesRequestSuccess,
  saveMatchRequestSuccess,
  deleteMatchRequestSuccess
} from '../actions/match-request.action';

export interface MatchesRequestState {
  matchesRequestList: MatchRequest[];
}

const initialMatchesRequestState: MatchesRequestState = {
  matchesRequestList: []
};

export const matchRequestSuccessReducer = createReducer(
  initialMatchesRequestState,
  on(getMatchesRequestSuccess, (state, { matchesRequestList }) => ({
    ...state,
    matchesRequestList: [...matchesRequestList]
  })),
  on(saveMatchRequestSuccess, (state, { matchRequest }) => ({
    ...state,
    matchesRequestList: [...state.matchesRequestList]
  })),
  on(deleteMatchRequestSuccess, (state, { matchRequest }) => ({
    ...state,
    matchesRequestList: [...state.matchesRequestList]
  }))
);
