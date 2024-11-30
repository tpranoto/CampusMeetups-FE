import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrippageComponent } from './edittrippage.component';

describe('EdittrippageComponent', () => {
  let component: EdittrippageComponent;
  let fixture: ComponentFixture<EdittrippageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittrippageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittrippageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
