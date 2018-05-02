import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HeaderComponent } from './shared/header.component';
import { MaterialModule } from './shared/material.module';
import { ProfileModule } from './profile/profile.module';

import { AppComponent } from './app.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash: true});


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    rootRouting,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
