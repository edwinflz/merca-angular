import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ListProfileComponent } from './container/list-profile/list-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [ListProfileComponent, ProfileComponent, CreateProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MaterialFileInputModule
  ]
})
export class AccountModule { }
