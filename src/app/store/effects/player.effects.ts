import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';

import { PlayersDBService } from '../../services/players-db.service';
import { of } from 'rxjs';
import {
  getPlayersStart,
  getPlayersSuccess,
  getPlayersError,
  savePlayerStart,
  savePlayerSuccess,
  savePlayerError,
  deletePlayerSuccess,
  deletePlayerError,
  deletePlayerStart,
  editPlayerStart,
  editPlayerSuccess,
  editPlayerError
} from '../actions/player.action';

@Injectable()
export class GetPlayersEffects {
  getPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPlayersStart),
      switchMap(() =>
        this.playersDBService
          .getPlayers()
          .pipe(map(playersList => getPlayersSuccess({ playersList })))
      ),
      catchError(error => of(getPlayersError(error)))
    )
  );

  constructor(
    private actions$: Actions,
    private playersDBService: PlayersDBService
  ) {}
}

@Injectable()
export class SavePlayersEffects {
  savePlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePlayerStart),
      switchMap(({ player }) =>
        this.playersDBService.savePlayer(player).pipe(
          map(doc => {
            player.id = doc.id;
            this.playersDBService.editPlayer(player);
            return savePlayerSuccess({ player });
          }),
          catchError(error => of(savePlayerError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private playersDBService: PlayersDBService
  ) {}
}

@Injectable()
export class EditPlayerEffects {
  editPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPlayerStart),
      switchMap(({ player }) =>
        this.playersDBService.editPlayer(player).pipe(
          map(() => editPlayerSuccess({ player })),
          catchError(error => of(editPlayerError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private playersDBService: PlayersDBService
  ) {}
}

@Injectable()
export class DeletePlayersEffects {
  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePlayerStart),
      switchMap(({ player }) =>
        this.playersDBService.deletePlayer(player).pipe(
          map(response => deletePlayerSuccess(response)),
          catchError(error => of(deletePlayerError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private playersDBService: PlayersDBService
  ) {}
}
