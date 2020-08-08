import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProductOriginComponent } from './product-origin/product-origin.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { BrandComponent } from './brand/brand.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'product-origin', component: ProductOriginComponent },
      { path: 'product-type', component: ProductTypeComponent },
      { path: 'product-category', component: ProductCategoryComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'product', component: ProductComponent },
      { path: 'inventory', component: InventoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
