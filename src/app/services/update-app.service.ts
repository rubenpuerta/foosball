import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { DialogComponent } from '../components/shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UpdateAppService {
  constructor(private dialog: MatDialog, private swUpdate: SwUpdate) {}

  checkUpdate() {
    this.swUpdate.available.subscribe(event => {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;

      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = true;
      dialogConfig.closeOnNavigation = true;
      dialogConfig.data = {
        id: 1,
        description: 'Ryanair foosball',
        question: 'A new version was found. Do you want to update?'
      };

      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        if (data === 'Yes') {
          window.location.reload();
        }
      });
    });
  }
}
