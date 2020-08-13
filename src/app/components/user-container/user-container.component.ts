import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  getPlayersList,
  getCurrentPlayer,
} from 'src/app/store/selectors/players.selector';
import { UsersListOptions } from 'src/app/interfaces/ui.interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import {
  deletePlayerStart,
  savePlayerStart,
} from 'src/app/store/actions/player.action';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContainerComponent {
  playersList$: Observable<Player[]>;
  currentPlayer$: Observable<Player>;
  userListOptions: UsersListOptions;
  isEditVisible: boolean;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.playersList$ = this.store.pipe(select(getPlayersList));
    this.currentPlayer$ = this.store.pipe(
      select(getCurrentPlayer, this.authService.registeredUser)
    );
    this.userListOptions = {
      allowCheck: false,
      displayedColumns: ['name', 'surname', 'options'],
      showOptions: true,
      filterVisible: false,
    };
  }

  doAccion(payload: { action: string; player: Player }) {
    if (payload.action === 'delete') {
      this.isEditVisible = false;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = true;
      dialogConfig.closeOnNavigation = true;
      dialogConfig.data = {
        id: 1,
        description: 'Foosball Booking',
        question: 'Are you sure to delete this player?',
      };

      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((data) => {
          if (data === 'Yes') {
            this.store.dispatch(deletePlayerStart({ player: payload.player }));
            this.authService.signOut();
          }
        });
    } else if (payload.action === 'edit') {
      this.isEditVisible = true;
    }
  }

  onSubmit(player: Player) {
    this.store.dispatch(savePlayerStart({ player }));
    this.router.navigate(['/home']);
  }
}
