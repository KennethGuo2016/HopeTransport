import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LifegroupService } from '../../services/lifegroup.service'
import { SessionStateService } from "../../services/session-state.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-managing-lifegroup',
  templateUrl: './managing-lifegroup.component.html',
  styleUrls: ['./managing-lifegroup.component.scss']
})

export class ManagingLifegroupComponent implements OnInit {
  units: string[];
  loggedIn: boolean;
  @ViewChild("lifeGroup") lifeGroup: ElementRef;

  constructor(
    private router: Router,
    private lifegroupService: LifegroupService,
    private sessionState: SessionStateService
  ) {
    sessionState.lifegroups$.subscribe(
      lifegroups => {
        this.units = lifegroups;
      }
    )
    sessionState.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.loggedIn = isLoggedIn;
      }
    )
  }

  delLifeGroup(unit) {
    if (confirm("Are you sure to delete this lifegroup?")) {
      const token = this.sessionState.token;
      this.lifegroupService.deleteLifegroup(unit, token).subscribe(
        response => {
          this.sessionState.deleteLifegroup(unit);
        },
        error => {
          alert("failed to delete this lifegroup. Try again")
        }
      );
    }
  }

  ngOnInit() {
    if (!this.loggedIn) {
      this.goToLogIn();
    }
  }

  goToLogIn() {
    this.router.navigate(['/home']);
  }
}