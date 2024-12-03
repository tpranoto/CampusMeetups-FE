import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddimageurldialogComponent } from './addimageurldialog.component';

describe('AddimageurldialogComponent', () => {
  let component: AddimageurldialogComponent;
  let fixture: ComponentFixture<AddimageurldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddimageurldialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddimageurldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
