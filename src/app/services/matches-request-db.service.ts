import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatchRequest } from '../interfaces/match-request.interface';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Injectable({
  providedIn: 'root'
})
export class MatchesRequestDBService {
  constructor(private db: AngularFirestore) {}

  getMatchesRequest(): Observable<MatchRequest[]> {
    return this.db
      .collection<MatchRequest>('matchesRequest')
      .valueChanges({ idField: 'id' });
  }

  saveMatchRequest(
    matchRequest: MatchRequest
  ): Observable<firebase.firestore.DocumentReference> {
    return from(
      this.db.collection<MatchRequest>('matchesRequest').add(matchRequest)
    );
  }

  deleteMatchRequest(matchRequest: MatchRequest): Observable<any> {
    return from(
      this.db
        .collection<MatchRequest>('matchesRequest')
        .doc(matchRequest.id)
        .delete()
    );
  }
}
