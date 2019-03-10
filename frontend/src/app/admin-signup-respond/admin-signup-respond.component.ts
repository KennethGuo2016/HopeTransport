import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-admin-signup-respond',
  templateUrl: './admin-signup-respond.component.html',
  styleUrls: ['./admin-signup-respond.component.scss']
})
export class AdminSignupRespondComponent implements OnInit {
  url: string = environment.FRONTEND_BASE + environment.FRONTEND_SIGNUP;
  constructor() { }

  ngOnInit() {
  }

}
