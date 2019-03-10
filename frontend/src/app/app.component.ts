import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  form;
  ngOnInit (){

  this.form = new FormGroup({

    lifegroup: new FormControl("", Validators.required),
    name: new FormControl("")


  });

  //title = 'app';
  }

  onSubmit = function (){
    console.log();
  }
}
