import { Routes } from '@angular/router';
import { MembersComponent } from './component/members/members.component';

export const routes: Routes = [
    {path: "", component: MembersComponent},
    {path: "Members", component: MembersComponent}
    
];
