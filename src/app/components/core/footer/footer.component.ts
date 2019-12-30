import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  services: object[] = [
    {
      title: 'Whatsapp',
      image: 'contact-whatsapp.webp',
      content: '0855 1500 878'
    },
    {
      title: 'Email',
      image: 'contact-email.webp',
      content: 'cs@tiket.com'
    },
    {
      title: 'Call Center',
      image: 'contact-call.png',
      content: '0804 1500 878 (Indonesia only)'
    }
  ];

  footerData: object[] = [
    {
      title: 'Company',
      content: [
        'Blog',
        'Carrier',
        'Corporate',
        'TIX Point',
        'Protection',
        'Installment',
        'Register Your Hotel',
      ]
    },
    {
      title: 'Product',
      content: [
        'Flight',
        'Hotel',
        'Train',
        'Car Rental',
        'Entertainment',
      ]
    },
    {
      title: 'Support',
      content: [
        'Help Center ',
        'Terms and Conditions',
        'Privacy and Policy',
        'Worry-Free Fare',
      ]
    }
  ];

  images: object[] = [
    {
      title: 'Secure Your Transaction',
      imageLink: [
        'transaction-visa.webp',
        'transaction-master-card.webp',
        'transaction-geotrust.webp',
        'transaction-jcb-secure.webp',
        'transaction-safekey.webp'
      ]
    },
    {
      title: 'Brand',
      imageLink: [
        'award-iata.webp',
        'award-topBrand.webp',
        'award-superbrand.webp'
      ]
    },
    {
      title: 'Follow Us',
      imageLink: [
        'social-facebook.webp',
        'social-linkedin.png',
        'social-youtube.png',
        'social-twitter.webp'
      ]
    }
  ];

  ngOnInit() {
  }

}
