import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Player } from 'src/app/interfaces/player.interface';
import { UsersListOptions } from 'src/app/interfaces/ui.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnChanges {
  @Input() playerList: Player[];
  @Input() currentPlayer: Player;
  @Input() userListOptions: UsersListOptions;
  @Output() selectedValues = new EventEmitter<Player[]>();
  @Output() selectedOption = new EventEmitter<{
    action: string;
    player: Player;
  }>();

  displayedColumns: string[];
  dataSource = new MatTableDataSource<Player>();
  selection = new SelectionModel<Player>(true, []);

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.playerList) {
      if (this.userListOptions.showOptions) {
        this.applyFilter(this.authService.registeredUser);
      }
      this.displayedColumns = [...this.userListOptions.displayedColumns];
      if (this.userListOptions.allowCheck) {
        this.displayedColumns.unshift('select');
      }
      this.dataSource.data = this.playerList;
      if (this.currentPlayer) {
        this.changed(true, this.currentPlayer);
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickRow(row: Player) {
    if (this.selection.selected.length > 3 && !this.selection.isSelected(row)) {
      this.snackBar.open('⚽ Maximum 4 players allowed ⚽', '', {
        duration: 3000
      });
    }
  }

  changed(matCheckBox, row: Player) {
    if (matCheckBox) {
      this.selection.toggle(row);
    }
    this.selectedValues.emit(this.selection.selected);
  }

  isDisabled(): boolean {
    return this.selection.selected.length > 3;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Player): string {
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row}`;
  }

  actionSelected(action: string, player: Player) {
    this.selectedOption.emit({ action, player });
  }
}
