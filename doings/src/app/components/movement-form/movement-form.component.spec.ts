import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementFormComponent } from './movement-form.component';

describe('MovementFormComponent', () => {
  let component: MovementFormComponent;
  let fixture: ComponentFixture<MovementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
