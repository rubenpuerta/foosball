import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getMatchesRequestStart,
  getMatchesRequestSuccess,
  getMatchesRequestError,
  saveMatchRequestStart,
  saveMatchRequestSuccess,
  saveMatchRequestError,
  deleteMatchRequestStart,
  deleteMatchRequestError,
  deleteMatchRequestSuccess
} from '../actions/match-request.action';
import { MatchesRequestDBService } from 'src/app/services/matches-request-db.service';
import { sendMessageNextMatchReady } from '../actions/message.actions';

@Injectable()
export class GetMatchesRequestEffects {
  getMatchesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMatchesRequestStart),
      switchMap(() =>
        this.matchRequestDBService
          .getMatchesRequest()
          .pipe(
            map(matchesRequestList =>
              getMatchesRequestSuccess({ matchesRequestList })
            )
          )
      ),
      catchError(error => of(getMatchesRequestError(error)))
    )
  );

  constructor(
    private actions$: Actions,
    private matchRequestDBService: MatchesRequestDBService
  ) {}
}

@Injectable()
export class SaveMatchRequestEffect {
  saveMatchRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveMatchRequestStart),
      switchMap(({ matchRequest }) =>
        this.matchRequestDBService.saveMatchRequest(matchRequest).pipe(
          map(response =>
            saveMatchRequestSuccess({
              matchRequest: { ...matchRequest, id: response.id }
            })
          ),
          catchError(error => of(saveMatchRequestError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private matchRequestDBService: MatchesRequestDBService
  ) {}
}

@Injectable()
export class DeleteMatchRequestEffect {
  deleteMatchRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMatchRequestStart),
      switchMap(({ matchRequest }) =>
        this.matchRequestDBService.deleteMatchRequest(matchRequest).pipe(
          switchMap(response => [deleteMatchRequestSuccess(response)]),
          catchError(error => of(deleteMatchRequestError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private matchRequestDBService: MatchesRequestDBService
  ) {}
}
