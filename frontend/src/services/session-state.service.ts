import { Injectable } from '@angular/core';

// Classes
import { Member } from '../classes/member';
import { Lifegroup } from '../classes/lifegroup';
import { Driver } from '../classes/driver';
import { Note } from "../classes/note"

import { MemberService } from './member.service';
import { LifegroupService } from './lifegroup.service';
import { NoteService } from './note.service';
import { AuthService } from './auth.service'

import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})

export class SessionStateService {
  members: Member[] = []
  membersUnticked: Member[] = [];
  //all drivers that are present
  drivers: Driver[] = [];
  //all passengers that are present
  passengers: Member[] = [];
  notes: Note[] = [];
  totalSeats: number = 0;
  
  selected: string[] = [];
  unselected: Member[] = [];

  lifegroups: string[] = [];
  
  token: string;
  adminLg: string;
  personToEdit: Member;

  private lifegroupsSubject = new BehaviorSubject<string[]>( null );
  private membersSubject = new BehaviorSubject<Member[]>( [] );
  private membersUntickedSubject = new BehaviorSubject<Member[]>( [] );
  private totalSeatsSubject = new BehaviorSubject<number>( null );
  private tokenSubject = new BehaviorSubject<string>( null );
  private isLoggedInSubject = new BehaviorSubject<boolean> ( false );
  private tickedSubject = new BehaviorSubject<boolean> ( false );

  lifegroups$ = this.lifegroupsSubject.asObservable();
  members$ = this.membersSubject.asObservable();
  membersUnticked$ = this.membersUntickedSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  totalSeats$ = this.totalSeatsSubject.asObservable();
  ticked$ = this.tickedSubject.asObservable();

  constructor(
    private memberService: MemberService,
    private lifegroupService: LifegroupService,
    private noteService: NoteService,
    private authService: AuthService
  ) {
    this.loadAllLifegroups();
  }

  loadAllLifegroups() {
    this.lifegroupService.getLifeGroup().subscribe(
      (lifegroups: string[]) => {
        this.lifegroups = lifegroups;
        this.lifegroupsSubject.next(lifegroups);
      }
    )
  }

  loadLifegroupMembers(refresh) {
    this.memberService.getLifegroupMembers(this.token, this.adminLg).subscribe(
      (members: Member[]) => {
        if (refresh) {
          var oldMemebers = Object.assign([], this.members);
          this.updateMembers(members);
          this.AddMembersUnticked(oldMemebers);
        } else {
          this.updateMembers(members);
          this.membersUnticked = members;
          this.membersUntickedSubject.next(this.membersUnticked);
        }
      }
    )
  }

  updateMembers(members) {
    this.members = members;
    this.membersSubject.next(this.members);
  }

  AddMembersUnticked(oldMembers) {
    this.members.map(
      (member: Member) => {
        for (var i = 0; i < oldMembers.length; i++) {
          const oldMember = oldMembers[i];
          if (member.id == oldMember.id) {
            break;
          }
          if (i == oldMembers.length - 1) {
            this.membersUnticked.push(member);
            this.membersUntickedSubject.next(this.membersUnticked);
          }
        }
      }
    )
  }

  loadLifegroupNotes() {
    this.noteService.getNotes(this.token, this.adminLg).subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
    )
  }

  addNewLifegroup(lifegroup) {
    this.lifegroups.push(lifegroup);
    this.lifegroupsSubject.next(this.lifegroups);
  }

  markMember(member) {
    
    if (member.seats > 0) {
      var driver = new Driver();
      driver.self = member;
      driver.passengers = [];
      driver.futurePassengers = [];
      this.drivers.push(driver);
      this.totalSeats += member.seats;
      this.totalSeatsSubject.next(this.totalSeats);
    } else {
      this.passengers.push(member);
      this.unselected.push(member);
    }
    var oldMembers = Object.assign([], this.members);
    const i = this.membersUnticked.indexOf(member);
    this.membersUnticked.splice(i, 1);
    this.membersUntickedSubject.next(this.membersUnticked)
    //I don't know why it removes the member from this.members as well
    //the following code is used to recover the original this.members
    this.members = oldMembers;
    this.membersSubject.next(this.members);
  }

  deleteMember(member) {
    var i = this.members.indexOf(member);
    this.members.splice(i, 1);
    this.membersSubject.next(this.members);
  }

  addMemberUnticked(member) {
    this.membersUnticked.push(member);
    this.membersUntickedSubject.next(this.membersUnticked);
  }

  updateAdminLg(adminLg) {
    this.adminLg = adminLg;
  }

  updateToken(token) {
    this.token = token;
    this.tokenSubject.next(token);
  }

  addNote(note) {
    this.notes.push(note);
  }

  deleteNotes(note) {
    const i = this.notes.indexOf(note);
    this.notes.splice(i, 1);
  }

  deleteLifegroup(name) {
    const i = this.lifegroups.indexOf(name);
    this.lifegroups.splice(i, 1);
    this.lifegroupsSubject.next(this.lifegroups);
  }

  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.authService.logout(this.token).subscribe(
      respond=>{
        this.updateToken('');
      }
    )
    this.totalSeats = 0;
    this.totalSeatsSubject.next(0);
    this.members = [];
    this.membersUnticked = []
    this.membersSubject.next([]);
    this.membersUntickedSubject.next([]);
    this.drivers = [];
    this.passengers = [];
    this.selected = [];
    this.unselected = [];
    this.tickedSubject.next(false);
    this.isLoggedInSubject.next(false);
  }

  tick() {
    this.tickedSubject.next(true);
  }

  updateTotalSeats(amount) {
    this.totalSeats += amount;
    this.totalSeatsSubject.next(this.totalSeats);
  }
}