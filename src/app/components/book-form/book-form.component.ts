import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Player } from 'src/app/interfaces/player.interface';
import { MatchRequest } from 'src/app/interfaces/match-request.interface';
import pluck from 'ramda/src/pluck';
import { Observable } from 'rxjs';
import { UsersListOptions } from 'src/app/interfaces/ui.interfaces';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getPlayersList } from 'src/app/store/selectors/players.selector';
import { MatInput } from '@angular/material/input';

/** Error when invalid control is dirty, touched, or submitted. */
export class MatchFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit {
  @Input() currentUser: Player;
  @Output() sentData = new EventEmitter<MatchRequest>();

  @ViewChild('matchName', { static: true }) nameInput: MatInput;

  matchForm: FormGroup;
  matcher = new MatchFormErrorStateMatcher();
  choosenPlayers: Player[];
  validPlayerList: boolean;
  playersList$: Observable<Player[]>;
  userListOptions: UsersListOptions;

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    const name = this.currentUser ? `${this.currentUser.name} match` : '';
    this.matchForm = this.fb.group({
      matchName: [name, [Validators.required]]
    });
    if (name) {
      this.nameInput.focus();
    }
    this.userListOptions = {
      allowCheck: true,
      displayedColumns: ['name', 'surname'],
      showOptions: false,
      filterVisible: true
    };
    this.playersList$ = this.store.pipe(select(getPlayersList));
  }

  selectedPlayers(players: Player[]) {
    this.choosenPlayers = players;
    this.validPlayerList = this.choosenPlayers.length ? true : false;
  }

  onFormSubmit() {
    this.sentData.emit({
      expired: false,
      matchName: this.matchForm.controls.matchName.value,
      players: pluck('id', this.choosenPlayers),
      matchOwnerEmail: this.currentUser.email,
      createdAt: new Date().getTime()
    });
    this.matchForm.reset();
  }
}
