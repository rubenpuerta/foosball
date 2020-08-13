import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import { State } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { deleteMatchRequestStart } from 'src/app/store/actions/match-request.action';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesListComponent {
  @Input() matches: MatchRequest[];
  // @Output() deleteMatchRequest = new EventEmitter<MatchRequest>();

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  deleteMatch(matchRequest: MatchRequest) {
    // this.deleteMatchRequest.emit(matchRequest);
    // this.store.dispatch(deleteMatchRequestStart({ matchRequest }));
    if (matchRequest.matchOwnerEmail === this.authService.registeredUser) {
      this.store.dispatch(deleteMatchRequestStart({ matchRequest }));
    } else {
      this.snackBar.open(
        `Matches are only erasable for the person who created it`,
        '',
        {
          panelClass: ['warning'],
          verticalPosition: 'bottom',
          duration: 5000
        }
      );
    }
  }
}
