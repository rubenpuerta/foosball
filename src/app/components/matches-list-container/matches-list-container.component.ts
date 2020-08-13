import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getMatchesWithFillOutPlayersList } from 'src/app/store/selectors/matches-request.selectors';
import { Observable } from 'rxjs';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import { deleteMatchRequestStart } from 'src/app/store/actions/match-request.action';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getCurrentPlayer } from 'src/app/store/selectors/players.selector';

@Component({
  selector: 'app-matches-list-container',
  templateUrl: './matches-list-container.component.html',
  styleUrls: ['./matches-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesListContainerComponent {
  matches$ = new Observable<MatchRequest[]>();

  constructor(private store: Store<State>) {
    this.matches$ = this.store.pipe(select(getMatchesWithFillOutPlayersList));
  }

  // deleteMatch(matchRequest: MatchRequest) {
  //   if (matchRequest.matchOwnerEmail === this.authService.registeredUser) {
  //     this.store.dispatch(deleteMatchRequestStart({ matchRequest }));
  //   } else {
  //     this.snackBar.open(
  //       `Matches are only erasable for the person who created it`,
  //       '',
  //       {
  //         panelClass: ['warning'],
  //         verticalPosition: 'bottom',
  //         duration: 5000
  //       }
  //     );
  //   }
  // }
}
