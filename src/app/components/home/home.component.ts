import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getNextMatchWithFillOutPlayersList } from 'src/app/store/selectors/matches-request.selectors';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  nextMatch$ = new Observable<MatchRequest[]>();
  message;

  constructor(
    private store: Store<State>,
    private msgService: MessagingService
  ) {
    this.nextMatch$ = this.store.pipe(
      select(getNextMatchWithFillOutPlayersList)
    );
  }

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }
}
