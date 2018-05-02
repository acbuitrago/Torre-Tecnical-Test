import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router, ActivatedRoute, ParamMap,Params} from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MainComponent } from './main.component';
import { MaterialModule } from '../shared/material.module';
import { ProfileService } from './profile.service';

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
    profileRouting,
    MaterialModule
  ],
  declarations:[
    ProfileComponent,
    MainComponent
  ],
  providers: [ProfileService]
})
export class ProfileModule {}
