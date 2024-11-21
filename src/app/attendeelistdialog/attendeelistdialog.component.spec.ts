import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeelistdialogComponent } from './attendeelistdialog.component';

describe('AttendeelistdialogComponent', () => {
  let component: AttendeelistdialogComponent;
  let fixture: ComponentFixture<AttendeelistdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendeelistdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeelistdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
