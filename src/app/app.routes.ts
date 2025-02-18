import { Routes } from '@angular/router';
import { MembersComponent } from './component/members/members.component';
import { LoginComponent } from './component/login/login.component';
import { AuthguardService } from './authguard.service';

export const routes: Routes = [
  { path: "", component: MembersComponent, canActivate: [AuthguardService] },
  { path: "Members", component: MembersComponent, canActivate: [AuthguardService] },
  { path: "login", component: LoginComponent }
];
