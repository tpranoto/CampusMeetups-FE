import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationdialogComponent } from './notificationdialog.component';

describe('NotificationdialogComponent', () => {
  let component: NotificationdialogComponent;
  let fixture: ComponentFixture<NotificationdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationdialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
