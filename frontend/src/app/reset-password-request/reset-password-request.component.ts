import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {

  resetPasswordForm: FormGroup;
  status: number;
  loading: boolean;
  
  @ViewChild("email") email: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {

    this.resetPasswordForm = fb.group({
      'email': [null, Validators.required]
    })
   }

  ngOnInit() {
  }

  onSubmit(){
    this.loading = true;
    this.status = null;
    const email = this.email.nativeElement.value;
    this.authService.resetPwRequest(email).subscribe(
      response => {
        this.loading = false;
        this.status = 200;
      },
      error => {
        this.loading = false;
        this.status = error.status;
      }
    )
  }

}
