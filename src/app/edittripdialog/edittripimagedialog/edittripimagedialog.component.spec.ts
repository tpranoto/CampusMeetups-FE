import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittripimagedialogComponent } from './edittripimagedialog.component';

describe('EdittripimagedialogComponent', () => {
  let component: EdittripimagedialogComponent;
  let fixture: ComponentFixture<EdittripimagedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittripimagedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittripimagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
