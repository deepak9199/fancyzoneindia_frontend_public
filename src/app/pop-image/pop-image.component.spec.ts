import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopImageComponent } from './pop-image.component';

describe('PopImageComponent', () => {
  let component: PopImageComponent;
  let fixture: ComponentFixture<PopImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
