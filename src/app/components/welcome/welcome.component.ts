import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { headerVisible } from 'src/app/store/actions/ui.actions';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {
  email: string;
  url: string;
  error = null;
  loginForm: FormGroup;
  matcher = new LoginFormErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<State>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isDisabled(): boolean {
    let value = true;
    if (!this.loginForm.pristine || !this.loginForm.untouched) {
      value =
        this.loginForm.controls.email.hasError('email') ||
        this.loginForm.controls.email.hasError('required');
    }
    return value;
  }

  confirmSignIn() {
    this.authService
      .isPlayerRegistered(this.loginForm.value.email)
      .subscribe(isPlayerResgistered => {
        if (isPlayerResgistered) {
          localStorage.setItem('fossball:email', this.loginForm.value.email);
          this.authService.registeredUser = this.loginForm.value.email;
          const headerOptions = { shouldBeVisible: true };
          this.store.dispatch(headerVisible({ headerOptions }));
          this.loginForm.reset();
          this.router.navigate(['/home']);
        } else {
          if (this.loginForm.value.email) {
            const warning = this.snackBar.open(
              `This email ${this.loginForm.value.email} is not registered. Please, check it out or just sign-up.`,
              'Sign-up',
              {
                panelClass: ['warning'],
                verticalPosition: 'top',
                duration: 30000
              }
            );
            warning
              .onAction()
              .subscribe(() => this.router.navigate(['/sign-up']));
          }
        }
      });
  }
}
