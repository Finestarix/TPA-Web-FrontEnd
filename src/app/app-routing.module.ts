import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {PlaneComponent} from './components/main/plane/plane.component';
import {HotelComponent} from './components/main/hotel/hotel.component';
import {TrainComponent} from './components/main/train/train.component';
import {HomeComponent} from './components/main/home/home.component';
import {CarComponent} from './components/main/car/car.component';
import {EntertainmentComponent} from './components/main/entertainment/entertainment.component';
import {MapComponent} from './components/main/hotel/map/map.component';
import {SearchHotelComponent} from './components/main/hotel/search-hotel/search-hotel.component';
import {DetailHotelComponent} from './components/main/hotel/detail-hotel/detail-hotel.component';
import {SearchCarComponent} from './components/main/car/search-car/search-car.component';
import {LoginAdminComponent} from './components/admin/login-admin/login-admin.component';
import {AuthGuard} from './guards/auth.guard';
import {HomeAdminComponent} from './components/admin/home-admin/home-admin.component';
import {InsertBlogAdminComponent} from "./components/admin/blog-admin/insert-blog-admin/insert-blog-admin.component";
import {UpdateBlogAdminComponent} from "./components/admin/blog-admin/update-blog-admin/update-blog-admin.component";

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
        children: [
          {
            path: '',
            component: PlaneComponent,
          }
        ]
      },
      {
        path: 'Hotel',
        children: [
          {
            path: '',
            component: HotelComponent,
          },
          {
            path: 'Map',
            component: MapComponent
          },
          {
            path: 'Search',
            component: SearchHotelComponent
          },
          {
            path: 'Detail',
            component: DetailHotelComponent
          }
        ]
      },
      {
        path: 'Train',
        component: TrainComponent
      },
      {
        path: 'Car Rental',
        children: [
          {
            path: '',
            component: CarComponent
          },
          {
            path: 'Search',
            component: SearchCarComponent
          }
        ]
      },
      {
        path: 'Entertainment',
        component: EntertainmentComponent
      }
    ]
  },
  {
    path: 'Admin',
    children: [
      {
        path: '',
        component: LoginAdminComponent,
      },
      {
        path: 'Home',
        component: HomeAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'InsertBlog',
        component: InsertBlogAdminComponent,
      },
      {
        path: 'UpdateBlog',
        component: UpdateBlogAdminComponent,
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
