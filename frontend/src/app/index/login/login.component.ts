import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OTPComponent } from '../../otp/otp.component';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { PusherService } from '../../services/pusher.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  rememberEmail: any;
  rememberPassword: any;
  remember = false;
  errorMessage = '';
  hide = true;
  isAuthy = false;
  otpDailogRef: MatDialogRef<OTPComponent>;
  dialogConfig = new MatDialogConfig();
  registerDialogRef: MatDialogRef<RegisterComponent>;



  constructor(
    private userServie: UsersService,
    private snack: MatSnackBar,
    private router: Router,
    private pusher: PusherService,
    private dialog: MatDialog,
    public loginDialog: MatDialogRef<LoginComponent>
  ) {
    }


  // login form
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get controls() { return this.loginForm.controls; }

  // login user
  loginUser() {
    if (this.loginForm.invalid) {
      return false;
    } else {
      this.userServie.login(this.loginForm.value).subscribe((data: any) => {
        if (data.success === false) {
          this.snack.open(data.msg, 'X',
          { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
        if (data[0]) {
          this.snack.open(data[0], 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
        }
        if (data.success === true && data.isAuthy === true) {
          this.isAuthy = true;
          this.openOTPDialog();
          this.loginDialog.close();
        } else if (data.success === true) {
          this.loginDialog.close();
          this.router.navigate(['/dashboard']);
          this.snack.open(data.msg, 'X', { duration: 4000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
        }
      }, error => {
        this.snack.open(error.message, 'X', { duration: 4000, panelClass: ['error-snackbar'], horizontalPosition: 'end' });
      });
    }
  }


  navigateRegister() {
    this.loginDialog.close();
    this.registerDialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      height: 'auto',
    });
  }


  navigateForgot() {
    this.loginDialog.close();
    this.router.navigate(['/forgot-password']);
  }

  // remember me
  rememberMe() {
  }

  openOTPDialog() {
    this.otpDailogRef = this.dialog.open(OTPComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      data: this.dialogConfig.data = {
        verify2FA: true,
        email: this.loginForm.controls.email.value
      }
    });
  }
}
