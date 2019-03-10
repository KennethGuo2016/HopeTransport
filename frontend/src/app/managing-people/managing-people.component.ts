import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Filter } from "../../filter.pipe"

import { MemberService } from "../../services/member.service"
import { SessionStateService } from "../../services/session-state.service"

import { Member } from "../../classes/member"
import { Driver } from "../../classes/driver"

@Component({
  selector: 'app-managing-people',
  templateUrl: './managing-people.component.html',
  styleUrls: ['./managing-people.component.scss']
})
export class ManagingPeopleComponent implements OnInit {
  
  managingForm: FormGroup;
  membersUnticked: Member[] = [];
  members: Member[] = [];
  drivers: Driver[] = [];
  passengers: Member[] = [];
  ticked: Boolean = false;
  filter: Boolean = false;
  totalSeats: number = 0;
  loggedIn: Boolean = true;

  @ViewChild("filterInput") filterInput: ElementRef;

  constructor(
    private pipe: Filter,
    private fb: FormBuilder,
    private memberService: MemberService,
    private sessionState: SessionStateService
  ) {
    //This is for validation on the name.
    this.managingForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      'validate': ''
    });
    sessionState.totalSeats$.subscribe(
      totalSeats => {
        this.totalSeats = totalSeats;
      }
    )
    sessionState.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.loggedIn = isLoggedIn;
      }
    )
    sessionState.ticked$.subscribe(
      ticked => {
        this.ticked = ticked;
      }
    )
    sessionState.members$.subscribe(
      members => {
        this.members = members;
      }
    )
    sessionState.membersUnticked$.subscribe(
      membersUnticked => {
        this.membersUnticked = membersUnticked;
      }
    )
  }

  ngOnInit() {
    this.drivers = this.sessionState.drivers;
    this.passengers = this.sessionState.passengers;
  }

  refresh() {
    this.sessionState.loadLifegroupMembers(true);
  }

  //this is the event handeling
  onName() {
    const query = this.filterInput.nativeElement.value;
    if (query.length > 0) {
      this.filter = true;
      this.membersUnticked = this.pipe.transform(this.membersUnticked, query);
    } else {
      this.filter = false;
      this.membersUnticked = this.sessionState.membersUnticked;
    }
  }

  delPerson(member) {
    const adminLg = this.sessionState.adminLg;
    const token = this.sessionState.token;
    this.memberService.deleteMember(member.id, token).subscribe(
      response => {
        this.sessionState.deleteMember(member);
      }, error => {
        alert("failed to delete the person. Please try again.")
      }
    );
  }

  editPerson(member) {
    this.sessionState.personToEdit = member;
  }

  mark(member) {
    this.sessionState.markMember(member);
    this.sessionState.tick();
    if (this.filter) {
      const query = this.filterInput.nativeElement.value;
      this.membersUnticked = this.pipe.transform(this.membersUnticked, query);
    }
  }

  logout() {
    this.sessionState.logout();
  }

}


