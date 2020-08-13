import { createReducer, on } from '@ngrx/store';
import { getPlayersSuccess } from '../actions/player.action';
import { Player } from 'src/app/interfaces/player.interface';

export interface PlayerState {
  playersList: Player[];
}

const initialplayerState: PlayerState = { playersList: [] };

export const playerSuccessReducer = createReducer(
  initialplayerState,
  on(getPlayersSuccess, (state, { playersList }) => ({
    ...state,
    playersList: [...playersList]
  }))
);

// on(editPlayer, (state, { player, id }) => {
//   const clonedArray = [...state.players];
//   const index = clonedArray.findIndex( user => user.id === id );
//   clonedArray[index] = player;
//   return { ...state, players: [...clonedArray] };
// }),

// on(deletePlayerSuccess, (state, {player}) => {
//   const clonedArray = [...state.playerList];
//   const index = clonedArray.findIndex(user => user.id === player.id);
//   clonedArray.splice(index, 1);
//   return { ...state, playerList: [...clonedArray] };
// });
