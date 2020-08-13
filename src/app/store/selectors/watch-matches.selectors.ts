import { createFeatureSelector, createSelector } from '@ngrx/store';

const getWatchMatchesState = createFeatureSelector('watchMatchesState');

export const getHasToBeWatched = createSelector(
  getWatchMatchesState,
  ({ hasToBeWatched }) => hasToBeWatched
);
