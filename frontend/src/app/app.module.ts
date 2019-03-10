import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';

//below is ngx-bootstrap extention link is here: https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/ 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
//above is ngx-bootstrap extention

//form module using reactive form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import animation module in here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//below are all of the components of each page 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManagingPeopleComponent } from './managing-people/managing-people.component';
import { ManagingTransportComponent } from './managing-transport/managing-transport.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditPageRespondComponent } from './edit-page-respond/edit-page-respond.component';
import { ManagingLifegroupComponent } from './managing-lifegroup/managing-lifegroup.component';

//http client module to get and post 
import { HttpClientModule } from '@angular/common/http';
import { Filter } from '../filter.pipe';
import { MemberService } from '../services/member.service';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminSignupRespondComponent } from './admin-signup-respond/admin-signup-respond.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ResetPasswordRespondComponent } from './reset-password-respond/reset-password-respond.component';

@NgModule({
  declarations: [
    //component added in here to run it (make sure import it)
    AppComponent,
    HomeComponent,
    
    routingComponent,
    
    ManagingPeopleComponent,
    ManagingTransportComponent,
    
    EditPageComponent,
    
    EditPageRespondComponent,
    
    ManagingLifegroupComponent,
    
    Filter,
    
    AdminSignupComponent,
    
    AdminSignupRespondComponent,
    
    ResetPasswordComponent,
    
    ResetPasswordRequestComponent,
    
    ChecklistComponent,
    
    ResetPasswordRespondComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MemberService, Filter],
  bootstrap: [AppComponent]
})
export class AppModule { }