import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UsersListOptions } from 'src/app/interfaces/ui.interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() shouldBeVisible: boolean;

  listPlayerOptions: UsersListOptions;
  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }
}
