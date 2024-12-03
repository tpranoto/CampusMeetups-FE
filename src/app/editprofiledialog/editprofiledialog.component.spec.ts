import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofiledialogComponent } from './editprofiledialog.component';

describe('EditprofiledialogComponent', () => {
  let component: EditprofiledialogComponent;
  let fixture: ComponentFixture<EditprofiledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprofiledialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofiledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
