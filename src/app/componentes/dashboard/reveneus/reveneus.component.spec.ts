import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReveneusComponent } from './reveneus.component';

describe('ReveneusComponent', () => {
  let component: ReveneusComponent;
  let fixture: ComponentFixture<ReveneusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReveneusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReveneusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
