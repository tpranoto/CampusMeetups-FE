import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittripdeletedialogComponent } from './edittripdeletedialog.component';

describe('EdittripdeletedialogComponent', () => {
  let component: EdittripdeletedialogComponent;
  let fixture: ComponentFixture<EdittripdeletedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittripdeletedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittripdeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
