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
import {CardboxTrainComponent} from './components/main/train/cardbox-train/cardbox-train.component';
import {TrainService} from './services/train.service';
import {SearchPlaneComponent} from './components/main/plane/search-plane/search-plane.component';
import {PromoPageComponent} from './components/main/promo-page/promo-page.component';
import {BlogPageComponent} from './components/main/blog-page/blog-page.component';
import {DetailBlogComponent} from './components/main/blog-page/detail-blog/detail-blog.component';
import {SearchEntertainmentComponent} from './components/main/entertainment/search-entertainment/search-entertainment.component';
import {DetailEntertainmentComponent} from './components/main/entertainment/detail-entertainment/detail-entertainment.component';
import {CalendarPriceComponent} from './components/main/plane/calendar-price/calendar-price.component';
import {ChatroomComponent} from './components/main/chatroom/chatroom.component';
import {AccountPageComponent} from "./components/core/navbar/account-page/account-page.component";

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
        path: 'Chat',
        component: ChatroomComponent
      },
      {
        path: 'Account',
        component: AccountPageComponent
      },
      {
        path: 'Flight',
        children: [
          {
            path: '',
            component: PlaneComponent,
          },
          {
            path: 'Search',
            component: SearchPlaneComponent
          },
          {
            path: 'Calendar',
            component: CalendarPriceComponent
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
        children: [
          {
            path: '',
            component: CardboxTrainComponent
          },
          {
            path: 'Search',
            component: TrainComponent
          }
        ]
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
        children: [
          {
            path: '',
            component: EntertainmentComponent
          },
          {
            path: 'Search',
            component: SearchEntertainmentComponent
          },
          {
            path: 'Detail',
            component: DetailEntertainmentComponent
          },
        ]
      },
      {
        path: 'Promo',
        component: PromoPageComponent
      },
      {
        path: 'Blog',
        children: [
          {
            path: '',
            component: BlogPageComponent
          },
          {
            path: 'Detail',
            component: DetailBlogComponent
          },
        ]
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
