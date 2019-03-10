import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MemberService } from '../../services/member.service';
import { SessionStateService } from '../../services/session-state.service';
import { SuburbService } from '../../services/suburb.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  driver: boolean = false;
  numberOfSeats: number = 0;
  units: string[] = [];
  suburbs: string[] = [];
  dirty: Boolean = false;
  loading: Boolean = false;

  //refer the id in html from the textfield.
  @ViewChild("firstName") firstName: ElementRef;
  @ViewChild("lastName") lastName: ElementRef;
  @ViewChild("suburbInput") suburbInput: ElementRef;
  @ViewChild("seatsInput") seatsInput: ElementRef;

  //this section is to check drivers and passengers status
  @ViewChild("isDriver") isDriverInput: ElementRef;
  @ViewChild("isNotDriver") isNotDriverInput: ElementRef;
  @ViewChild("lg") lg: ElementRef;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private suburbService: SuburbService,
    private sessionState: SessionStateService, 
    public router: Router) {

    this.signupForm = fb.group({
      "lifegroup": ["default", this.lifegroupValidator()],
      'firstname': [null, Validators.compose([Validators.required, this.nameValidator()])],
      'lastname': [null, Validators.compose([Validators.required, this.nameValidator()])],
      'suburb': [null, Validators.compose([this.suburbService.suburbValidator()])],
      'numberOfSeats': [],
      'validate': ''
    });

    sessionState.lifegroups$.subscribe(
      lifegroups => {
        this.units = lifegroups;
      }
    )
  }

  ngOnInit() {
  }

  //make a post request to the api to store that member to the database
  onSubmit() {
    this.loading = true;
    const name = this.firstName.nativeElement.value + " " + this.lastName.nativeElement.value;
    if (this.driver) {
      this.numberOfSeats = this.seatsInput.nativeElement.value;
    }
    const body = {
      lifegroup: this.lg.nativeElement.value,
      name: name,
      seats: this.numberOfSeats,
      suburb: this.suburbInput.nativeElement.value
    }
    this.memberService.createMember(body, this.sessionState.token).subscribe(
      response => {
        this.loading = false;
        this.goToSignupResponse();
      },
      error => {
        this.loading = false;
        if (error.status == 422) {
          alert("the member is already in the database")
        } else if (error.status == 500) {
          alert("something's wrong with the database. Please contact the developer")
        } else if (error.status == 0) {
          alert("the backend api is down. Please contact the developer")
        } else {
          alert("something is wrong. Please try again or contact the developer")
        }
      }
    );
  }

  //handles the radio button "are you a driver"
  checkDriver() {
    if (this.isDriverInput.nativeElement.checked) {
      this.driver = true;
      this.signupForm.controls['numberOfSeats'].setValidators(Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(7)]));
    } else if (this.isNotDriverInput.nativeElement.checked) {
      this.driver = false;
      this.signupForm.controls['numberOfSeats'].clearValidators();
    }
    this.signupForm.controls['numberOfSeats'].updateValueAndValidity();
  }

  //search for the full suburb name followed by a postcode
  searchPostcode() {
    const suburb = this.suburbInput.nativeElement.value;
    if (suburb == ''|| suburb.length == 1) {
      this.dirty = false;  
    } else {
      this.dirty = true;
      this.suburbs = this.suburbService.searchPostCode(suburb);
    }    
    if (this.signupForm.controls['suburb'].validator == null) {
      this.signupForm.controls['suburb'].setValidators(this.suburbService.suburbValidator);
      this.signupForm.controls['suburb'].updateValueAndValidity();
    }
  }

  selectSuburb(sub) {
    this.suburbInput.nativeElement.value = sub;
    this.suburbs = [];
    this.signupForm.controls['suburb'].clearValidators();
    this.signupForm.controls['suburb'].updateValueAndValidity();
    this.dirty = false;
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { null: boolean } | ValidationErrors => {
      if (control.value == null) {
        return null;
      }
      if (control.value.replace(/\s/g, "").match('^[a-zA-Z\s]+$')) {
        return null;
      } else {
        return {'name not validated': false};
      }
    };
  }

  lifegroupValidator(): ValidatorFn {
    return (control: AbstractControl): { null: boolean } | ValidationErrors => {
      if (control.value == null) {
        return null;
      }
      if (control.value == "default"){
        return {"lifegroup not selected": false};
      }
      return null;
    };
  }

  goToSignupResponse() {
    this.router.navigate(['/submit-responds']);
  }
}