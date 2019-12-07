import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutControlComponent } from './about-control.component';

describe('AboutControlComponent', () => {
  let component: AboutControlComponent;
  let fixture: ComponentFixture<AboutControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
