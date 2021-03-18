import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface Day {
	value: any;
  viewValue: any;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(
    public dialogRef: MatDialog,

  ) {  }

  ngOnInit(): void {
  }
  close(): void {
  this.dialogRef.closeAll();
  }
}
