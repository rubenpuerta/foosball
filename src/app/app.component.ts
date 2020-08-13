import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './store/reducers';
import { getPlayersStart } from './store/actions/player.action';
import { getMatchesRequestStart } from './store/actions/match-request.action';
import { UpdateAppService } from './services/update-app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { getUIHeaderVisible } from './store/selectors/ui-userlist.selector';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { headerVisible } from './store/actions/ui.actions';
import { take } from 'rxjs/operators';
import { getIsAppLoading } from './store/selectors/app-status.selectors';
import { MessagingService } from './services/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  message: BehaviorSubject<any>;
  shouldBeVisible: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private updateAppService: UpdateAppService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoading$ = this.store.pipe(select(getIsAppLoading));
    this.shouldBeVisible = this.store.pipe(select(getUIHeaderVisible));
    this.store.dispatch(getPlayersStart());
    this.store.dispatch(getMatchesRequestStart());
    this.updateAppService.checkUpdate();
    this.isLoading$.subscribe(value => {
      if (!value) {
        this.initializeApp();
      }
    });
  }

  initializeApp() {
    const userEmail = localStorage.getItem('fossball:email');
    if (userEmail) {
      this.authService
        .isPlayerRegistered(userEmail)
        .pipe(take(1))
        .subscribe(isRegistered => {
          if (isRegistered) {
            this.authService.registeredUser = userEmail;
            const headerOptions = { shouldBeVisible: true };
            this.store.dispatch(headerVisible({ headerOptions }));
            this.router.navigate(['/home']);
          } else {
            localStorage.removeItem('fossball:email');
            this.router.navigate(['/login']);
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
