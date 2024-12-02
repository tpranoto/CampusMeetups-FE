import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittripdialogComponent } from './edittripdialog.component';

describe('EdittripdialogComponent', () => {
  let component: EdittripdialogComponent;
  let fixture: ComponentFixture<EdittripdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittripdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittripdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
