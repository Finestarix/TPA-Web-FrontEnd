import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NavbarMenuComponent} from './components/navbar/navbar-menu/navbar-menu.component';
import {NavbarDropdownComponent} from './components/navbar/navbar-dropdown/navbar-dropdown.component';
import {LoginComponent} from './components/login/login.component';
import {FeatureComponent} from './components/login/feature/feature.component';
import {TextFieldComponent} from './components/core/text-field/text-field.component';
import {MainComponent} from './components/main/main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarMenuComponent,
    NavbarDropdownComponent,
    LoginComponent,
    FeatureComponent,
    TextFieldComponent,
    MainComponent,
  ],
  entryComponents: [LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
