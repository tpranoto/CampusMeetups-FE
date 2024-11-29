import { TestBed } from '@angular/core/testing';

import { NotificationdialogService } from './notificationdialog.service';

describe('NotificationdialogService', () => {
  let service: NotificationdialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationdialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
