import { Routes } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SearchComponent } from './components/search/search.component';

export const ROUTES: Routes = [
    {path: '', component: SearchComponent},
    {path: 'user/:id', component: UserProfileComponent}
];
