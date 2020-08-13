import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { UsersListOptions } from 'src/app/interfaces/ui.interfaces';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import { saveMatchRequestStart } from 'src/app/store/actions/match-request.action';
import { Router } from '@angular/router';
import { getCurrentPlayer } from 'src/app/store/selectors/players.selector';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import { sendMessageNextMatchReady } from 'src/app/store/actions/message.actions';
import { Message } from 'src/app/interfaces/message.interface';
import pluck from 'ramda/src/pluck';
import { getNextMatchPlayers } from 'src/app/store/selectors/matches-request.selectors';

@Component({
  selector: 'app-book-form-container',
  templateUrl: './book-form-container.component.html',
  styleUrls: ['./book-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormContainerComponent {
  listPlayerOptions: UsersListOptions;
  currentPlayerInfo$: Observable<Player>;
  playersFromCurrentMatch$: Observable<Player[]>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private authService: AuthService
  ) // private messagingService: MessagingService
  {
    this.currentPlayerInfo$ = this.store.pipe(
      select(getCurrentPlayer, this.authService.registeredUser)
    );
    this.playersFromCurrentMatch$ = this.store.pipe(
      select(getNextMatchPlayers)
    );
  }

  onSubmit(matchRequest: MatchRequest) {
    this.store.dispatch(saveMatchRequestStart({ matchRequest }));
    // this.playersFromCurrentMatch$.subscribe(players => {
    //   const messagePayLoad: Message = {
    //     registration_ids: pluck('messageId', players),
    //     notification: {
    //       title: 'Fossball',
    //       body: 'Welcome to fossball reservation app',
    //       image: '../../assets/images/avatars/icon-32x32.png'
    //     }
    //   };
    //   this.messagingService.sendMessage(messagePayLoad);
    // });

    this.router.navigate(['/home']);
  }
}
