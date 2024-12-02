import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetripimagedialogComponent } from './createtripimagedialog.component';

describe('CreatetripimagedialogComponent', () => {
  let component: CreatetripimagedialogComponent;
  let fixture: ComponentFixture<CreatetripimagedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatetripimagedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetripimagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
