import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStateService } from '../../services/session-state.service';
import { LifegroupService } from '../../services/lifegroup.service'
import {Lifegroup } from '../../classes/lifegroup'

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {
  adminForm: FormGroup;
  status: number;
  loading: boolean;
  @ViewChild("lg") lifegroup: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("confirm_password") confirm_password: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionState: SessionStateService,
    private lifegroupService: LifegroupService ) { 
    this.adminForm = fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'confirm_password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])],
      'lifegroup': [null, Validators.required],
      'email': [null, Validators.required],
      'validate' : ''
    });
  }

  ngOnInit() {
  
  }

  onSubmit() {
    this.status = null;
    this.loading = true;
    const body = {
      name: this.lifegroup.nativeElement.value,
      email: this.email.nativeElement.value,
      password: this.password.nativeElement.value,
      confirm_password: this.confirm_password.nativeElement.value
    }
    this.lifegroupService.createLifegroup(body).subscribe(
      (lifegroup: Lifegroup) => {
        this.loading = false;
        this.status = 201;
        this.sessionState.addNewLifegroup(lifegroup.name);
        this.goToAdminSignupRespond();
      },
      error => {
        this.loading = false;
        this.status = error.status;
      }
    );
  }

  goToAdminSignupRespond() {
    this.router.navigate(['/admin-signup-respond']);
  }
}