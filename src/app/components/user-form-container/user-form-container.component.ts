import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Player } from 'src/app/interfaces/player.interface';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Router } from '@angular/router';
import { editPlayerStart } from 'src/app/store/actions/player.action';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-form-container',
  templateUrl: './user-form-container.component.html',
  styleUrls: ['./user-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormContainerComponent {
  constructor(
    private store: Store<State>,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(player: Player) {
    this.store.dispatch(editPlayerStart({ player }));
    this.authService.registeredUser = player.email;
    this.router.navigate(['/home']);
  }
}
