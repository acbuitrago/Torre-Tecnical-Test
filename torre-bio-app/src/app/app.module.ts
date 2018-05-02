import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { DialogAskUser } from './profile/profile.component';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HeaderComponent } from './shared/header.component';
import { MaterialModule } from './shared/material.module';
import { ProfileModule } from './profile/profile.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash: true});


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    rootRouting,
    ProfileModule,
    LinkedInSdkModule
  ],
  providers: [  { provide: 'apiKey', useValue: '781y46u32qk68z' },  { provide: 'authorize', useValue: 'tru' }, // OPTIONAL by default: false
    { provide: 'isServer', useValue: 'false'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
