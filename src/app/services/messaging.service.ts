import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Player } from '../interfaces/player.interface';
import { select, Store } from '@ngrx/store';
import { getCurrentPlayer } from '../store/selectors/players.selector';
import { State } from '../store/reducers';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  currentUserData$: Observable<Player>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private store: Store<State>,
    private angularFireMessaging: AngularFireMessaging
  ) {
    if (!this.authService.registeredUser) {
      return;
    }
    this.currentUserData$ = this.store.pipe(
      select(getCurrentPlayer, this.authService.registeredUser)
    );
  }

  updateToken(token) {
    this.currentUserData$.pipe(take(1)).subscribe(player => {
      const data = { [player.id]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        this.updateToken(token);
      },
      err => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(payload => {
      console.log('new message received. ', payload);
      alert(payload);
      this.currentMessage.next(payload);
    });
  }
}

// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireMessaging } from '@angular/fire/messaging';
// import { take } from 'rxjs/operators';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Store, select } from '@ngrx/store';
// import { State } from '../store/reducers';
// import { Player } from '../interfaces/player.interface';
// import { getCurrentPlayer } from '../store/selectors/players.selector';
// import { editPlayerStart } from '../store/actions/player.action';
// import { Message } from '../interfaces/message.interface';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable()
// export class MessagingService {
//   currentMessage = new BehaviorSubject(null);
//   currentPlayer$: Observable<Player>;

//   constructor(
//     private angularFireDB: AngularFireDatabase,
//     private angularFireAuth: AngularFireAuth,
//     private angularFireMessaging: AngularFireMessaging,
//     private store: Store<State>,
//     private http: HttpClient
//   ) {
//     this.angularFireMessaging.messaging.subscribe(_messaging => {
//       _messaging.onMessage = _messaging.onMessage.bind(_messaging);
//       _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
//     });
//   }

//   /**
//    * update token in firebase database
//    *
//    * @param userId userId as a key
//    * @param token token as a value
//    */
//   updateToken(userId, token) {
//     this.currentPlayer$ = this.store.pipe(select(getCurrentPlayer, userId));
//     // we can change this function to request our backend service
//     this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
//       this.currentPlayer$.subscribe(player => {
//         player.messageId = token;
//         this.store.dispatch(editPlayerStart({ player }));
//         // const data = {};
//         // data[userId] = token;
//         // this.angularFireDB.object('fcmTokens/').update(data);
//       });
//     });
//   }

//   /**
//    * request permission for notification from firebase cloud messaging
//    *
//    * @param userId userId
//    */
//   requestPermission(userId): string {
//     let currentToken: string;
//     this.angularFireMessaging.requestToken.subscribe(
//       token => {
//         this.updateToken(userId, token);
//         currentToken = token;
//       },
//       err => {
//         console.error('Unable to get permission to notify.', err);
//       }
//     );
//     return currentToken;
//   }

//   /**
//    * hook method when new notification received in foreground
//    */
//   receiveMessage() {
//     this.angularFireMessaging.messages.subscribe(payload => {
//       console.log('new message received. ', payload);
//       this.currentMessage.next(payload);
//     });
//   }

//   sendMessage(payload: Message) {
//     console.log(payload);
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Authorization:
//           // tslint:disable-next-line: max-line-length
//           'AAAAGhHS9MA:APA91bGuTkO882-F9dZv_9tsF97k7qwysJ7nC98Vp-3kYwnhnkyDtOe9IjS7mub3CQilyFNw_4VH5NmQPMqTUQFWQM_V6latDNKoqALy381eY9mwFYv_jxATBmrDjRAPWKW8_aFg-MAq'
//       })
//     };
//     const url = 'https://fcm.googleapis.com/fcm/send';
//     console.log('URL', url, 'PAYLOAD', payload, 'HTTPOPTIONS', httpOptions);
//     this.http.post<Message>(url, payload, httpOptions).subscribe(
//       data => console.log(data),
//       error => console.log(error)
//     );
//   }
// }
