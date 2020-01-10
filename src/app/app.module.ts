import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloModule} from 'apollo-angular';
import {GraphQLModule} from './graphql.module';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {TextFieldComponent} from './components/core/text-field/text-field.component';
import {MainComponent} from './components/main/main.component';
import {FooterComponent} from './components/core/footer/footer.component';
import {ImageTextComponent} from './components/core/image-text/image-text.component';
import {NavbarComponent} from './components/core/navbar/navbar.component';
import {NavbarDropdownComponent} from './components/core/navbar/navbar-dropdown/navbar-dropdown.component';
import {RegisterComponent} from './components/register/register.component';
import {PlaneComponent} from './components/main/plane/plane.component';
import {HotelComponent} from './components/main/hotel/hotel.component';
import {TrainComponent} from './components/main/train/train.component';
import {HomeComponent} from './components/main/home/home.component';
import {CustomMenuLinkComponent} from './components/core/custom-menu-link/custom-menu-link.component';
import {PasswordFieldComponent} from './components/core/password-field/password-field.component';
import {OptionFieldComponent} from './components/core/option-field/option-field.component';
import {CarComponent} from './components/main/car/car.component';
import {EntertainmentComponent} from './components/main/entertainment/entertainment.component';
import {OrderComponent} from './components/main/order/order.component';
import {ProfileComponent} from './components/core/navbar/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TextFieldComponent,
    PasswordFieldComponent,
    OptionFieldComponent,
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
    CustomMenuLinkComponent,
    CarComponent,
    EntertainmentComponent,
    OrderComponent,
    ProfileComponent
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
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

