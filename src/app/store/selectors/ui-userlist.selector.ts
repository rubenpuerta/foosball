import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeaderOptions } from 'src/app/interfaces/ui.interfaces';

const getcommonUIState = createFeatureSelector('uiState');

export const getUIHeaderOptions = createSelector(
  getcommonUIState,
  ({ headerOptions }) => headerOptions
);

export const getUIHeaderVisible = createSelector(
  getUIHeaderOptions,
  (headerOptions: HeaderOptions) => headerOptions.shouldBeVisible
);
