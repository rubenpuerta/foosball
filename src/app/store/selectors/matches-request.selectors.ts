import { createFeatureSelector, createSelector } from '@ngrx/store';
import assoc from 'ramda/src/assoc';
import sortBy from 'ramda/src/sortBy';
import prop from 'ramda/src/prop';
import { getPlayersList } from './players.selector';
import { Player } from 'src/app/interfaces/player.interface';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import pathOr from 'ramda/src/pathOr';

const getMatchesRequestState = createFeatureSelector('matchesRequestState');

export const getMatchesRequest = createSelector(
  getMatchesRequestState,
  ({ matchesRequestList }) => matchesRequestList
);

export const getMatchesWithFillOutPlayersList = createSelector(
  getPlayersList,
  getMatchesRequest,
  (playersList, matchesRequestList) => {
    const players = matchesRequestList.map((matchRequest: MatchRequest) =>
      matchRequest.players.map(id =>
        playersList.find((player: Player) => player.id === id)
      )
    );
    return sortBy(prop('createdAt'))(
      matchesRequestList.map((matchRequest: MatchRequest, createdAt: number) =>
        assoc('players', players[createdAt], matchRequest)
      ) as MatchRequest[]
    );
  }
);

export const getNextMatchWithFillOutPlayersList = createSelector(
  getMatchesWithFillOutPlayersList,
  matchesWithFillOutPlayersList =>
    matchesWithFillOutPlayersList[0] ? [matchesWithFillOutPlayersList[0]] : []
);

export const getNextMatchPlayers = createSelector(
  getNextMatchWithFillOutPlayersList,
  nextMatch => {
    const players = pathOr([], [0, 'players'], nextMatch);
    players.filter(player => player.messageId);
    return pathOr([], [0, 'players'], nextMatch);
  }
);
