import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Player } from 'src/app/interfaces/player.interface';

/** Error when invalid control is dirty, touched, or submitted. */
export class UserFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  @Input() previousData: Player;
  @Output() sentData = new EventEmitter<Player>();
  playerForm: FormGroup;
  matcher = new UserFormErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.playerForm = this.fb.group({
      name: [this.previousData.name, [Validators.required]],
      surname: [this.previousData.surname, [Validators.required]],
      email: [
        this.previousData.email,
        [Validators.required, Validators.email]
      ]
    });
  }

  onFormSubmit() {
    this.sentData.emit(this.playerForm.value);
    this.playerForm.reset();
  }
}
