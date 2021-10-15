import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestePageComponent } from './teste-page.component';

describe('TestePageComponent', () => {
  let component: TestePageComponent;
  let fixture: ComponentFixture<TestePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
