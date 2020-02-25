import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTrainAdminComponent } from './insert-train-admin.component';

describe('InsertTrainAdminComponent', () => {
  let component: InsertTrainAdminComponent;
  let fixture: ComponentFixture<InsertTrainAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertTrainAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTrainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
