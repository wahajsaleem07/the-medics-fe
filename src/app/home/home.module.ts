import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOriginComponent } from './product-origin/product-origin.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { BrandComponent } from './brand/brand.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [HomeComponent, ProductOriginComponent, ProductTypeComponent, ProductCategoryComponent, BrandComponent, SupplierComponent, ProductComponent, InventoryComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
