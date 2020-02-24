import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEventAdminComponent } from './insert-event-admin.component';

describe('InsertEventAdminComponent', () => {
  let component: InsertEventAdminComponent;
  let fixture: ComponentFixture<InsertEventAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertEventAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
