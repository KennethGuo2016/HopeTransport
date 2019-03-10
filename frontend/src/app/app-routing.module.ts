import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SubmitRespondsComponent } from './submit-responds/submit-responds.component';
import { ManagingTransportComponent } from './managing-transport/managing-transport.component';
import { ManagingPeopleComponent } from './managing-people/managing-people.component';
import { HomeComponent } from './home/home.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditPageRespondComponent } from './edit-page-respond/edit-page-respond.component';
import { ManagingLifegroupComponent } from './managing-lifegroup/managing-lifegroup.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminSignupRespondComponent } from './admin-signup-respond/admin-signup-respond.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRespondComponent } from './reset-password-respond/reset-password-respond.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { ChecklistComponent } from './checklist/checklist.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password/:email/:reset_code', component: ResetPasswordComponent},
  { path: 'reset-password-respond', component: ResetPasswordRespondComponent},
  { path: 'reset-password-request', component: ResetPasswordRequestComponent},
  { path: 'submit-responds', component: SubmitRespondsComponent },
  { path: 'managing-transport', component: ManagingTransportComponent },
  { path: 'managing-people', component: ManagingPeopleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit-page', component: EditPageComponent },
  { path: 'edit-page-respond', component: EditPageRespondComponent },
  { path: 'managing-lifegroup', component: ManagingLifegroupComponent },
  { path: 'admin-signup', component: AdminSignupComponent },  
  { path: 'admin-signup-respond', component: AdminSignupRespondComponent },
  { path: 'checklist', component: ChecklistComponent},
  { path: '**', component: SignupComponent }

];
//above is what i changed

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  //below is add the component to link it together
  SignupComponent,
  SubmitRespondsComponent,
  ManagingTransportComponent,
  ManagingPeopleComponent,
  HomeComponent
]