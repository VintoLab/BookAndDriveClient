import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExtrasComponent } from './new-extras.component';

describe('NewExtrasComponent', () => {
  let component: NewExtrasComponent;
  let fixture: ComponentFixture<NewExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewExtrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
