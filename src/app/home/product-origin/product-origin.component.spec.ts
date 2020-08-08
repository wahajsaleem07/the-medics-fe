import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOriginComponent } from './product-origin.component';

describe('ProductOriginComponent', () => {
  let component: ProductOriginComponent;
  let fixture: ComponentFixture<ProductOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
