import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppStatusState } from '../reducers/app-status.reducer';

const getAppLoadingState = createFeatureSelector('appStatus');

export const getIsAppLoading = createSelector(
  getAppLoadingState,
  (state: AppStatusState) => state.isPlayersLoading || state.isPlayersLoading
);
