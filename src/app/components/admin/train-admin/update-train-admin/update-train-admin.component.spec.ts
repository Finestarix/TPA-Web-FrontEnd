import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrainAdminComponent } from './update-train-admin.component';

describe('UpdateTrainAdminComponent', () => {
  let component: UpdateTrainAdminComponent;
  let fixture: ComponentFixture<UpdateTrainAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTrainAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTrainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
