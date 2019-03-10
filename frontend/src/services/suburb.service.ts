import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { environment } from '../environments/environment';
import { Suburb } from '../classes/suburb'

@Injectable({
  providedIn: 'root'
})
export class SuburbService {
  constructor(private httpClient: HttpClient) { }

  searchPostCode(suburb) {
    var result = [];
    const url = environment.API_BASE + environment.API_SUBURB + "?" + environment.NAME + "=" + suburb;
    this.httpClient.get(url)
    .subscribe(
      (suburbs: Suburb[]) => {
        console.log(suburbs)
        if (suburbs.length > 10) {
          var arr = suburbs.reverse().slice(0, 10);
          suburbs = arr;
        }
        suburbs.map(
          (suburb: Suburb) => {
            result.push(suburb.name + ", " + suburb.state.abbreviation + " " + suburb.postcode);
          }
        )
      }
    )
    return result;
  }

  suburbValidator(): ValidatorFn {
    return (control: AbstractControl): { null: boolean } | ValidationErrors => {
      if (control.value == null) {
        return {'suburb': 'the suburb is empty'};
      }
      const index = control.value.indexOf(',');
      if (isNaN(parseInt(control.value.slice(-4))) || index == -1) {
        return { 'suburb': "the suburb is not in the incorrect format"};
      }
      if (control.value.slice(index+2, index+5) != "QLD") {
        return {'state': "incorrect state name"};
      }
      return null;
    };
  }
}
