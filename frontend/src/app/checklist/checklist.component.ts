import { Component, OnInit } from '@angular/core';

import { SessionStateService } from '../../services/session-state.service'

import { Member } from "../../classes/member"
import { Driver } from "../../classes/driver"
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  drivers: Driver[] = [];
  passengers: Member[] = [];
  
  constructor(
    private sessionState: SessionStateService
  ) { 
  }

  ngOnInit() {
    this.drivers = this.sessionState.drivers;
    this.passengers = this.sessionState.passengers;
  }

  //oops the driver is actually not here
  delDriver(driver) {
    driver.passengers.map(
      (homeless: Member) => {
        this.sessionState.unselected.push(homeless);
        const index = this.sessionState.selected.indexOf(homeless.name);
        this.sessionState.selected.splice(index, 1);
      }
    )
    const i = this.sessionState.drivers.indexOf(driver);
    this.sessionState.drivers.splice(i, 1);
    this.sessionState.updateTotalSeats(-driver.self.seats)
    this.sessionState.addMemberUnticked(driver.self);
  }

  //oops the passenger is actually not here
  delPassenger(passenger) {
    const i = this.sessionState.passengers.indexOf(passenger);
    this.sessionState.passengers.splice(i, 1);
    const j = this.sessionState.unselected.indexOf(passenger);
    this.sessionState.unselected.splice(j, 1);
    this.sessionState.addMemberUnticked(passenger);
    this.sessionState.drivers.map(
      (driver: Driver) => {
        var index = driver.futurePassengers.indexOf(passenger);
        if (index != -1) {
          driver.futurePassengers.splice(index, 1);
        }
        index = driver.passengers.indexOf(passenger);
        if (index != -1) {
          driver.passengers.splice(index, 1);
        }
      }
    )
  }

}
