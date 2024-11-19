import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetrippageComponent } from './createtrippage.component';

describe('CreatetrippageComponent', () => {
  let component: CreatetrippageComponent;
  let fixture: ComponentFixture<CreatetrippageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatetrippageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetrippageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
