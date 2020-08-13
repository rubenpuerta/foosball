import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';
import { Store, select } from '@ngrx/store';
import { savePlayerStart } from 'src/app/store/actions/player.action';
import { isPlayerEmailExist } from 'src/app/store/selectors/players.selector';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player.interface';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-passwordless-auth',
  templateUrl: './passwordless-auth.component.html',
  styleUrls: ['./passwordless-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordlessAuthComponent {
  error = null;
  loginForm: FormGroup;
  matcher = new LoginFormErrorStateMatcher();
  emailSent: Observable<boolean>;
  currentUser$: Observable<Player>;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private store: Store<State>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.store.pipe(select(isPlayerEmailExist, email));
  }

  isDisabled(): boolean {
    let value = true;
    if (!this.loginForm.pristine || !this.loginForm.untouched) {
      value =
        this.loginForm.controls.name.hasError('required') ||
        this.loginForm.controls.surname.hasError('required') ||
        this.loginForm.controls.email.hasError('email') ||
        this.loginForm.controls.email.hasError('required');
    }
    return value;
  }

  signIn() {
    this.isEmailRegistered(this.loginForm.value).subscribe(isRegistered => {
      if (!isRegistered) {
        this.store.dispatch(savePlayerStart({ player: this.loginForm.value }));
        localStorage.setItem('fossball:email', this.loginForm.value.email);
        this.authService.registeredUser = this.loginForm.value.email;
        this.loginForm.reset();
        this.router.navigate(['/home']);
      } else {
        if (this.loginForm.value) {
          const warning = this.snackBar.open(
            `This email ${this.loginForm.value.email} already exist. Please, check it out or just login.`,
            'Login',
            {
              panelClass: ['warning'],
              verticalPosition: 'top',
              duration: 30000
            }
          );
          warning.onAction().subscribe(() => this.router.navigate(['/login']));
        }
      }
    });
  }
}
