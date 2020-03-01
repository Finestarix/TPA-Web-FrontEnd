import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlaneComponent } from './search-plane.component';

describe('SearchPlaneComponent', () => {
  let component: SearchPlaneComponent;
  let fixture: ComponentFixture<SearchPlaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
