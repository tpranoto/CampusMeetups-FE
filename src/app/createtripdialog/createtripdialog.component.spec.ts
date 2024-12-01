import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetripdialogComponent } from './createtripdialog.component';

describe('CreatetripdialogComponent', () => {
  let component: CreatetripdialogComponent;
  let fixture: ComponentFixture<CreatetripdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatetripdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetripdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
