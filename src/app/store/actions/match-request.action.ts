import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/interfaces/error.interface';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';

// GET MATCHES REQUEST ACTIONS
export const getMatchesRequestStart = createAction(
  '[getMatchesRequestStart] Start - New match request effect'
);

export const getMatchesRequestSuccess = createAction(
  '[getMatchesRequestSuccess] Save into Store the existing match request',
  props<{ matchesRequestList: MatchRequest[] }>()
);

export const getMatchesRequestError = createAction(
  '[getMatchesRequestError] Give an error, if not succeed',
  props<{ error: ApiError }>()
);

// SET MATCHES REQUEST ACTIONS
export const saveMatchRequestStart = createAction(
  '[saveMatchRequestStart] Start - New match set request effect',
  props<{ matchRequest: MatchRequest }>()
);

export const saveMatchRequestSuccess = createAction(
  '[saveMatchRequestSuccess] Save into Store the new match request',
  props<{ matchRequest: MatchRequest }>()
);

export const saveMatchRequestError = createAction(
  '[saveMatchRequestError] Give an error, if not succeed',
  props<{ error: ApiError }>()
);

// DELETE MATCHES REQUEST ACTIONS
export const deleteMatchRequestStart = createAction(
  '[deleteMatchRequestStart] Start - Delete match request effect',
  props<{ matchRequest: MatchRequest }>()
);

export const deleteMatchRequestSuccess = createAction(
  '[deleteMatchRequestSuccess] Delete from Store the match request',
  props<{ matchRequest: MatchRequest }>()
);

export const deleteMatchRequestError = createAction(
  '[deleteMatchRequestError] Give an error, if not succeed',
  props<{ error: ApiError }>()
);

export const startWatchingFinishedMatches = createAction (
  '[startWatchingFinishedMatches] Start routine to delete finished futbolin matches'
);

export const stopWatchingFinishedMatches = createAction (
  '[endWatchingFinishedMatches] End routine to delete finished futbolin matches'
);
