import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Player } from '../interfaces/player.interface';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import identical from 'ramda/es/identical';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class PlayersDBService {
  constructor(private db: AngularFirestore) {}

  getPlayers(): Observable<Player[]> {
    return this.db
      .collection<Player>('players')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Player;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getSinglePlayer(playerId: string) {
    return this.db
      .collection<Player>('player')
      .doc(playerId)
      .snapshotChanges();
  }

  savePlayer(player: Player): Observable<DocumentReference> {
    return from(this.db.collection<Player>('players').add(player));
  }

  editPlayer(player: Player): Observable<any> {
    return from(
      this.db
        .collection<Player>('players')
        .doc(player.id)
        .set(player)
    );
  }

  deletePlayer(player: Player): Observable<any> {
    return from(
      this.db
        .collection<Player>('players')
        .doc(player.id)
        .delete()
    );
  }
}
