import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountpageComponent } from './myaccountpage.component';

describe('MyaccountpageComponent', () => {
  let component: MyaccountpageComponent;
  let fixture: ComponentFixture<MyaccountpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyaccountpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaccountpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
