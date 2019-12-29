import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {ApolloModule, Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {GoogleApiModule, GoogleApiService, GoogleAuthService, GoogleApiConfig, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {TextFieldComponent} from './components/core/text-field/text-field.component';
import {MainComponent} from './components/main/main.component';
import {FooterComponent} from './components/footer/footer.component';
import {ImageTextComponent} from './components/core/image-text/image-text.component';
import {NavbarMenuComponent} from './components/core/navbar-menu/navbar-menu.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NavbarDropdownComponent} from './components/navbar/navbar-dropdown/navbar-dropdown.component';
import {RegisterComponent} from './components/register/register.component';
import {PlaneComponent} from './components/main/plane/plane.component';
import {HotelComponent} from './components/main/hotel/hotel.component';
import {TrainComponent} from './components/main/train/train.component';
import {HomeComponent} from './components/main/home/home.component';

export function createApollo(httpLink: HttpLink) {
  console.log('Connect to API');
  return {
    link: httpLink.create({uri: 'http://localhost:4201/'}),
    cache: new InMemoryCache(),
  };
}

const googleClientConfig: NgGapiClientConfig = {
  client_id: '336495925518-defp19eeubg3kq7erdlna5n7bteffog0.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  ux_mode: 'popup',
  redirect_uri: 'http://localhost:4200',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarMenuComponent,
    LoginComponent,
    TextFieldComponent,
    MainComponent,
    FooterComponent,
    ImageTextComponent,
    NavbarComponent,
    NavbarDropdownComponent,
    RegisterComponent,
    PlaneComponent,
    HotelComponent,
    TrainComponent,
    HomeComponent,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: googleClientConfig
    }),
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})



export class AppModule {
}

