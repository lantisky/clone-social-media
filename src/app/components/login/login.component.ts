import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private afAuth: AngularFireAuth,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.authService.userData.subscribe(user => {
        if (user) {
          this.router.navigateByUrl('/').then();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  login(form: NgForm): void {
    const {email, password} = form.value;
    if (!form.valid){
      return;
    }

    this.authService.SignIn(email, password);
    form.resetForm();
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px',
    });
    dialogRef.afterClosed().subscribe(result => {
      const {fname, lname, email, password, avatar} = result;

      if (result !== undefined){
          this.authService.SignUp(email, password, fname, lname, avatar);
      }
      else{
        return;
      }
      console.log('Dialog Result: ${result}');
    });
  }
}
