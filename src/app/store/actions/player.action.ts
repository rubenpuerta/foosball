import { createAction, props } from '@ngrx/store';
import { Player } from 'src/app/interfaces/player.interface';
import { ApiError } from 'src/app/interfaces/error.interface';

// GET PLAYERS ACTIONS
export const getPlayersStart = createAction(
  '[getPlayersStart] Start add new player effect'
);

export const getPlayersSuccess = createAction(
  '[getPlayerSuccess] Add a new player, if succeed',
  props<{ playersList: Player[] }>()
);

export const getPlayersError = createAction(
  '[addPlayerError] Give an error, if not succeed',
  props<{ error: ApiError }>()
);

// GET SINGLE PLAYER DATA
export const getPlayerData = createAction(
  '[getPlayersData] Retrieve player data',
  props<{ playerId: string }>()
);

// SAVE PLAYER ACTIONS

export const savePlayerStart = createAction(
  '[savePlayerStart] Start add new player effect',
  props<{ player: Player }>()
);

export const savePlayerSuccess = createAction(
  '[savePlayerSuccess] Add a new player, if succeed',
  props<{ player: Player }>()
);

export const savePlayerError = createAction(
  '[savePlayerError] Give an error, if not succeed',
  props<{ error: ApiError }>()
);

// EDIT PLAYER ACTIONS

export const editPlayerStart = createAction(
  '[editPlayerStart] Start Update player data',
  props<{ player: Player }>()
);

export const editPlayerSuccess = createAction(
  '[editPlayerSuccess] Update player data',
  props<{ player: Player }>()
);

export const editPlayerError = createAction(
  '[editPlayerError] Give an error, in not succeed',
  props<{ error: ApiError }>()
);

// DELETE PLAYER ACTIONS

export const deletePlayerStart = createAction(
  '[deletePlayerStart] Start Delete player data',
  props<{ player: Player }>()
);

export const deletePlayerSuccess = createAction(
  '[deletePlayerSuccess] Delete player data',
  props<{ player: Player }>()
);

export const deletePlayerError = createAction(
  '[deletePlayerError] Give an error, in not succeed',
  props<{ error: ApiError }>()
);
