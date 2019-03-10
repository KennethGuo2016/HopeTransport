import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SessionStateService } from '../../services/session-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  adminForm: FormGroup;
  units: Array<string> = [];
  loading: Boolean = false;
  status: number;

  @ViewChild("id") setId: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("lg") lg: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private authService: AuthService,
    private sessionState: SessionStateService
    ) {
    this.adminForm = fb.group({
      'password': [null, Validators.compose([Validators.required, 
        Validators.pattern('^[a-zA-Z0-9]+$')])],
      'lifegroup': [null, Validators.compose([Validators.required])],
      'validate' : ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.status = null;
    this.loading = true;
    const adminLg = this.lg.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.sessionState.updateAdminLg(adminLg);
    this.authService.login(adminLg, password).subscribe(
      data => {
        this.loading = false;
        this.status = 200;
        const token = data['access_token'];
        this.sessionState.login();
        this.sessionState.updateToken(token);
        this.sessionState.updateAdminLg(adminLg);
        if (adminLg=="admin") {
          this.goToManagingLifegroup();
          return;
        }
        this.sessionState.loadLifegroupMembers(false);
        this.sessionState.loadLifegroupNotes();
        this.goToManagingPeople();
        
      },
      error => {
        this.loading = false;
        this.status = error.status;
      }
    );
  }

  goToManagingPeople() {
    this.router.navigate(['/managing-people'])
  }

  goToManagingLifegroup() {
    this.router.navigate(['/managing-lifegroup'])
  }
  
}
