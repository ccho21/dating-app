import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss'],
})
export class RolesModalComponent implements OnInit {
  user?: User;
  roles?: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User; roles: any[] },
    private dialogRef: MatDialogRef<RolesModalComponent>
  ) {}

  ngOnInit(): void {
    console.log('### data', this.data);
    if (this.data) {
      this.user = { ...this.data.user };
      this.roles = [...this.data.roles];
    }
  }

  updateRoles() {
    console.log('### this.roles', this.roles);
    this.dialogRef.close(this.roles);
  }
}
