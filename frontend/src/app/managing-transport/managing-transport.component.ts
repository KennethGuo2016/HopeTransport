import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngCopy } from 'angular-6-clipboard';

import { Note } from '../../classes/note'
import { Driver } from '../../classes/driver'
import { Member } from '../../classes/member'

import { SessionStateService } from '../../services/session-state.service'
import { NoteService } from '../../services/note.service'

@Component({
  selector: 'app-managing-transport',
  templateUrl: './managing-transport.component.html',
  styleUrls: ['./managing-transport.component.scss'],
})

export class ManagingTransportComponent implements OnInit {

  drivers: Driver[] = this.sessionState.drivers;
  passengers: Member[] = this.sessionState.passengers;
  selected: string[] = this.sessionState.selected;
  unselected: Member[] = this.sessionState.unselected;
  transportForm: FormGroup;
  displayPlan: Boolean = false;
  copied: Boolean = false;
  loggedIn: Boolean = false;
  clickedDisplay: Boolean = false;
  notes: Note[] = this.sessionState.notes;
  editNotes:boolean = false;
  status:number;
  loading = false;

  @ViewChild("note") noteInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private sessionState: SessionStateService) {

    this.transportForm = fb.group({
      'passengername': [null, Validators.required],
      'validate': ''
    });
    sessionState.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.loggedIn = isLoggedIn;
      }
    )
  }

  ngOnInit() {
    this.drivers = this.sessionState.drivers;
    this.passengers = this.sessionState.passengers;
    this.sortUnselectedPassengers();
  }

  addNote() {
    this.loading = true;
    this.status = null;
    const note = this.noteInput.nativeElement.value;
    const token = this.sessionState.token;
    const adminLg = this.sessionState.adminLg;
    this.noteService.addNote(note, token, adminLg).subscribe(
      (createdNote: Note) => {
        this.loading = false;
        this.sessionState.addNote(createdNote);
      },
      error => {
        this.loading = false;
        if (error.status == 0) {
          alert("The backend api is down");
        } else {
          alert("Something went wrong. Please try again");
        }
      }
    );
  }
 
  cancelNote(note) {
    const token = this.sessionState.token;
    this.noteService.deleteNote(note.id, token).subscribe();
    this.sessionState.deleteNotes(note);
  }

  animatePassenger(driver, passenger) {
    this.clickedDisplay = false;
    if (driver.passengers.length < driver.self.seats) {
      this.mapPasToDriver(driver, passenger);
    }
  }

  mapPasToDriver(driver, passenger) {
    driver.passengers.push(passenger);
      this.sessionState.selected.push(passenger.name);
      const j = this.sessionState.unselected.indexOf(passenger);
      this.sessionState.unselected.splice(j, 1);
      this.drivers.map(
        (eachDriver: Driver) => {
          const i = eachDriver.futurePassengers.indexOf(passenger);
          eachDriver.futurePassengers.splice(i, 1);
        }
      )
  }

  cancelAlloc(driver, passenger) {
    this.copied = false;
    this.clickedDisplay = false;
    this.displayPlan = false;
    const i = driver.passengers.indexOf(passenger);
    driver.passengers.splice(i, 1);
    const j = this.sessionState.selected.indexOf(passenger.name);
    this.sessionState.selected.splice(j, 1);
    this.sessionState.unselected.push(passenger);
    this.sessionState.drivers.map(
      (eachDriver: Driver) => {
        eachDriver.futurePassengers.push(passenger);
        var pasCpy = Object.assign([], eachDriver.futurePassengers);
        const postcode = parseInt(eachDriver.self.suburb.slice(-4));
        var sorted = this.sortPassengersForAdriver(postcode, pasCpy);
        eachDriver.futurePassengers = sorted;
      }
    )
  }

  generatePlan() {
    this.clickedDisplay = true;
    this.copied = false;
    this.drivers.map(
      (driver: Driver) => {
        if (driver.passengers.length > 0) {
          this.displayPlan = true;
          return;
        }
      }
    )
  }

  sortUnselectedPassengers() {
    this.sessionState.drivers.map(
      (driver: Driver) => {
        const postcode = parseInt(driver.self.suburb.slice(-4));
        driver.futurePassengers = [];
        var pasCpy = Object.assign([], this.unselected);
        for (var i = 0; i < this.unselected.length; i++) {
          const min = this.findMin(postcode, pasCpy);
          if (parseInt(min.suburb.slice(-4)) == postcode && driver.passengers.length < driver.self.seats) {
            this.mapPasToDriver(driver, min);
          } else {
            driver.futurePassengers.push(min);
          }
          const index = pasCpy.indexOf(min);
          pasCpy.splice(index, 1);
        }
      }
    )
  }

  copy() {
    this.copied = true;
    var plan = "";
    this.drivers.map(
      (driver: Driver) => {
        plan += driver['name'] + "\n";
        driver.passengers.map(
          (passenger: Member) => {
            plan += "• " + passenger.name + "\n"
          }
        )  
      }
    )
    ngCopy(plan);
  }

  logout() {
    this.sessionState.logout();
  }

  sortPassengersForAdriver(driverPostcode, pasCpy) {
    const len = pasCpy.length;
    var sorted = []
    for (var i = 0; i < len; i++) {
      const min = this.findMin(driverPostcode, pasCpy);
      sorted.push(min);
      const index = pasCpy.indexOf(min);
      pasCpy.splice(index, 1);
    }
    return sorted;
  }

  findMin(driverPostcode, passengers) {
    if (passengers.length == 1) {
      return passengers[0];
    }
    var minDiff = 500;
    var closest;
    passengers.forEach((passenger) => {
      const diff = Math.abs(parseInt(passenger.suburb.slice(-4)) - driverPostcode);
      if (diff < minDiff) {
        minDiff = diff;
        closest = passenger;
      }
    })
    return closest;
  }

  toggleShowPassengers(driver) {
    driver.showPassengers = !driver.showPassengers;
  }

  toggleSelectPassengers(driver) {
    driver.selectPassengers = !driver.selectPassengers;
  }
}