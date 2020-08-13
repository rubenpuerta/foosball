import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { PlayerState, playerSuccessReducer } from './player.reducer';
import {
  MatchesRequestState,
  matchRequestSuccessReducer
} from './matches-request.reducer';
import { UIState, commonUIReducer } from './ui.reducers';
import {
  WatchMatchesState,
  watchMatchesReducer
} from './watch-matches.reducers';
import {
  AppStatusState,
  appStatusReducer
} from '../reducers/app-status.reducer';

export interface State {
  playerState: PlayerState;
  matchesRequestState: MatchesRequestState;
  uiState: UIState;
  watchMatchesState: WatchMatchesState;
  appStatus: AppStatusState;
}

export const reducers: ActionReducerMap<State> = {
  playerState: playerSuccessReducer,
  matchesRequestState: matchRequestSuccessReducer,
  uiState: commonUIReducer,
  watchMatchesState: watchMatchesReducer,
  appStatus: appStatusReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
