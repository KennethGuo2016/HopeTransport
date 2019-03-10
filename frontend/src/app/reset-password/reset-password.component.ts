import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service"

import { environment } from '../../environments/environment'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  email: string;
  resetCode: string;
  loading: Boolean = false;
  status: number;
  link:string;
  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.resetPasswordForm = fb.group({
      'password': [null, Validators.required],
      'confirm_password': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.link = environment.FRONTEND_BASE + environment.FRONTEND_RESETPWREQ;
    this.route.params.subscribe(params => {
      this.email = params['email'];
      this.resetCode = params['reset_code'];
    });
  }

  onSubmit() {
    this.status = null;
    this.loading = true;
    const body = {
      password: this.password.nativeElement.value,
      confirm_password: this.confirmPassword.nativeElement.value,
      email: this.email,
      reset_code: this.resetCode
    }
    this.authService.resetPw(body).subscribe(
      response => {
        this.loading = false;
        this.goToReponsePage();
      },
      error => {
        this.loading = false;
        this.status = error.status;
      }
    )
  }

  goToReponsePage() {
    this.router.navigate(['/reset-password-respond']);
  }
}