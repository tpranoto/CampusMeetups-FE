import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecttripcardComponent } from './recttripcard.component';

describe('RecttripcardComponent', () => {
  let component: RecttripcardComponent;
  let fixture: ComponentFixture<RecttripcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecttripcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecttripcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
