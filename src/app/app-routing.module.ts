import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {PlaneComponent} from './components/main/plane/plane.component';
import {HotelComponent} from './components/main/hotel/hotel.component';
import {TrainComponent} from './components/main/train/train.component';
import {HomeComponent} from './components/main/home/home.component';
import {CarComponent} from './components/main/car/car.component';
import {EntertainmentComponent} from './components/main/entertainment/entertainment.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'Flight',
        component: PlaneComponent
      },
      {
        path: 'Hotel',
        component: HotelComponent
      },
      {
        path: 'Train',
        component: TrainComponent
      },
      {
        path: 'Car Rental',
        component: CarComponent
      },
      {
        path: 'Entertainment',
        component: EntertainmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
