import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardboxCarComponent } from './cardbox-car.component';

describe('CardboxCarComponent', () => {
  let component: CardboxCarComponent;
  let fixture: ComponentFixture<CardboxCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardboxCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardboxCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
