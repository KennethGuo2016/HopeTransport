import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MemberService } from '../../services/member.service';
import { SuburbService } from '../../services/suburb.service'
import { SessionStateService } from '../../services/session-state.service'

import { Member } from '../../classes/member'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})

export class EditPageComponent implements OnInit {
  editForm: FormGroup;
  member: Object;
  suburbs: Array<string> = [];
  dirty: Boolean = false;
  @ViewChild("suburbInput") suburbInput: ElementRef;
  @ViewChild("seats") inputSeats: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private memberService: MemberService,
    private suburbService: SuburbService,
    private sessionState: SessionStateService,
    ) {
    this.editForm = fb.group ({
      'suburb': [],
      'seats': [],
      'validate': ''
    })
   }

  ngOnInit() {
    this.member = this.sessionState.personToEdit;
  }

  searchPostcode() {
    const suburb = this.suburbInput.nativeElement.value;
    if (suburb.indexOf(',')!= -1) {
      return;
    }
    if (suburb == ''||suburb.length == 1) {
      this.dirty = false;  
    } else {
      this.dirty = true;
      this.suburbs = this.suburbService.searchPostCode(suburb);
    }
    if (this.editForm.controls['suburb'].validator == null) {
      this.editForm.controls['suburb'].setValidators(this.suburbService.suburbValidator);
      this.editForm.controls['suburb'].updateValueAndValidity();
    }
  }

  selectSuburb(sub) {
    this.suburbInput.nativeElement.value = sub;
    this.suburbs = [];
    this.editForm.controls['suburb'].clearValidators();
    this.editForm.controls['suburb'].updateValueAndValidity();
    this.dirty = false;
  }

  onKey() {
    if (this.editForm.controls['seats'].validator == null) {
      this.editForm.controls['seats'].setValidators(Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(7)]));
        this.editForm.controls['seats'].updateValueAndValidity();
    }
  }

  onSubmit() {
    const body = {
      id: this.sessionState.personToEdit.id,
      suburb: this.suburbInput.nativeElement.value,
      seats: this.inputSeats.nativeElement.value,
    }
    this.memberService.editMember(body, this.sessionState.token).subscribe(
      (editedMember: Member)=>{
        this.sessionState.members.map(
          (member: Member) => {
            if (member.name != editedMember.name) {
              return;
            }
            member.seats = editedMember.seats;
            member.suburb = editedMember.suburb;
          }
        )
      }
    );
    this.goToEditpageRespond();   
  }

  goToEditpageRespond() {
    this.router.navigate(['/edit-page-respond']);
  }
}