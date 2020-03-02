import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PromoService} from "../../../services/promo.service";

@Component({
  selector: 'app-promo-page',
  templateUrl: './promo-page.component.html',
  styleUrls: ['./promo-page.component.scss']
})
export class PromoPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private promoService: PromoService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  id: number;
  data1: any;
  data2: any;

  ngOnInit() {

  }

  getAllParameterData(params) {
    this.id = params.id;

    this.promoService.getPromo(this.id).subscribe(async value => {
      await this.getData1(value);
    });

    this.promoService.getOther(this.id).subscribe(async value => {
      await this.getData2(value);
    });
  }

  getData1(value) {
    this.data1 = value.data.GetPromo;
    console.log(this.data1)
  }

  getData2(value) {
    this.data2 = value.data.OtherPromo;
    console.log(this.data2)
  }

  facebook() {
    window.open('http://www.facebook.com/sharer.php?u=localhost:4200/Promo?id=' + this.data1.id, 'facebookShare', 'width=626,height=436');
  }

  whatsapp() {
    window.open('https://api.whatsapp.com/send?text=localhost:4200/Promo?id=' + this.data1.id)
  }

  copy() {
    navigator.clipboard.writeText('localhost:4200/Promo?id=' + this.data1.id);
  }

  googleTranslateElementInit() {
    // new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }


}
