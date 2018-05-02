import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router, ActivatedRoute, ParamMap,Params} from '@angular/router';
import { ProfileComponent, DialogAskUser } from './profile.component';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MaterialModule } from '../shared/material.module';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';

const profileRouting: ModuleWithProviders =RouterModule.forChild([
  {
    path: ':userid',component: ProfileComponent,
  },
  {
    path: '',component: MainComponent,
  }
]);


@NgModule({
  imports:[
    CommonModule,
    profileRouting,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [ProfileComponent, DialogAskUser],

  declarations:[
    ProfileComponent,
    DialogAskUser,
    MainComponent
  ],
  providers: [ProfileService]
})
export class ProfileModule {}
