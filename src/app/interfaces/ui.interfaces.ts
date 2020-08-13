import { Player } from './player.interface';

export interface UsersListOptions {
  allowCheck: boolean;
  displayedColumns: string[];
  showOptions: boolean;
  filterVisible: boolean;
}

export interface HeaderOptions {
  shouldBeVisible: boolean;
}
