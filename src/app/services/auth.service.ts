import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isPlayerEmailExist } from '../store/selectors/players.selector';
import { State } from '../store/reducers';
import { headerVisible } from '../store/actions/ui.actions';
import { HeaderOptions } from '../interfaces/ui.interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private activeUser: string;

  constructor(private store: Store<State>, private router: Router) {}

  isPlayerRegistered(userEmail: string) {
    return this.store.pipe(select(isPlayerEmailExist, userEmail));
  }

  set registeredUser(registeredUser: string) {
    this.activeUser = registeredUser;
  }

  get registeredUser(): string {
    return this.activeUser;
  }

  public signOut() {
    const headerOptions: HeaderOptions = {
      shouldBeVisible: false
    };
    localStorage.removeItem('fossball:email');
    this.activeUser = null;
    this.router.navigate(['/login']);
    this.store.dispatch(headerVisible({ headerOptions }));
  }

  // constructor(public afAuth: AngularFireAuth) {
  //   this.afAuth.auth.useDeviceLanguage();
  // }

  // public signIn(email: string): Promise<any> {
  //   const actionCodeSettings = {
  //     url: `http://localhost:4200/welcome`,
  //     handleCodeInApp: true
  //   };
  //   return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  // }

  // public confirmSignIn(email: string, url: string): Promise<any> {
  //   return this.afAuth.auth.signInWithEmailLink(email, url);
  // }

  // public signOut() {
  //   return this.afAuth.auth.signOut();
  // }

  // public getAuthStateObserver(): Observable<any> {
  //   return this.afAuth.authState;
  // }
}
