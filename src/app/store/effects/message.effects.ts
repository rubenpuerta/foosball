import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap, first } from 'rxjs/operators';
import { sendMessageNextMatchReady } from '../actions/message.actions';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { Message } from 'src/app/interfaces/message.interface';
import { MessagingService } from 'src/app/services/messaging.service';
import pluck from 'ramda/src/pluck';
import { getNextMatchPlayers } from '../selectors/matches-request.selectors';
import { combineLatest } from 'rxjs';

// @Injectable()
// export class SendMessageNewMatchRequestEffects {
//   sendNewMessage$ = createEffect(
//     () =>
//       combineLatest(
//         this.actions$.pipe(ofType(sendMessageNextMatchReady)),
//         this.store.pipe(select(getNextMatchPlayers))
//       ).pipe(
//         first(([_, players]) => players.length > 0),
//         tap(([_, players]) => {
//           const messagePayLoad: Message = {
//             registration_ids: pluck('messageId', players),
//             notification: {
//               title: 'Fossball',
//               body: 'Welcome to fossball reservation app',
//               image: '../../assets/images/avatars/icon-32x32.png'
//             }
//           };
//           return this.messagingService.sendMessage(messagePayLoad);
//         })
//       ),
//     { dispatch: false }
//   );

//   constructor(
//     private actions$: Actions,
//     private messagingService: MessagingService,
//     private store: Store<State>
//   ) {}
// }
