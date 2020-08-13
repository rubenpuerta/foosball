import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Player } from 'src/app/interfaces/player.interface';
import { getNextMatchWithFillOutPlayersList } from './matches-request.selectors';

const getPlayerState = createFeatureSelector('playerState');

export const getPlayersList = createSelector(
  getPlayerState,
  ({ playersList }) => playersList
);

export const isPlayerEmailExist = createSelector(
  getPlayersList,
  (playersList: Player[], email: string) =>
    !!playersList.find(player => player.email === email)
);

export const getCurrentPlayer = createSelector(
  getPlayersList,
  (playerList: Player[], email: string) => {
    return playerList.find(player => player.email === email);
  }
);
