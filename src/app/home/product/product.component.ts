import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  addMode: boolean;
  editMode: boolean;
  productForm: FormGroup;
  loading = false;
  submitted = false;
  items: any;
  itemStatus: boolean = true;
  productCategoryList: any;
  productTypeList: any;
  productOriginList: any;
  brandList: any;
  selectedItemId: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.selectedItemId = '';

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      dosage: [""],
      narcoFlag: [ true ],
      productCategory: ["", Validators.required],
      productOrigin: ["", Validators.required],
      productType: ["", Validators.required],
      brandId: ["", Validators.required]
    });

    const promise1 = this.apiService.get("/product-category");
    const promise2 = this.apiService.get("/product-type");    
    const promise3 = this.apiService.get("/product-origin");
    const promise4 = this.apiService.get("/brand");

    forkJoin([promise1, promise2, promise3, promise4]).subscribe(response => {
      let result: any = response;
      this.productCategoryList = result[0].items;
      this.productTypeList = result[1].items;
      this.productOriginList = result[2].items;
      this.brandList = result[3].items;
    });

    this.addMode = false;
    this.editMode = false;

    this.apiService.get("/product")
      .subscribe((result: any) => {
        this.items = result.items;
        for(let i=0; i < this.items.length; i++){
          this.items[i].display = this.items[i].name + this.items[i].dosage ? '-' + this.items[i].dosage : '';
          this.items[i].productCategory = this.items[i].product_category.name;
          this.items[i].productType = this.items[i].product_type.name;
          this.items[i].productOrigin = this.items[i].product_origin.name;
          this.items[i].brand = this.items[i].brandId.name;
          this.items[i].narcoFlag = this.items[i].narco_flag;
        }
      });
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.f.name.invalid || this.f.code.invalid) {
      return;
    }

    this.loading = true;

    let obj = {
      name: this.f.name.value,
      code: this.f.code.value,
      dosage: this.f.dosage.value,
      narcoFlag: this.f.narcoFlag.value,
      productCategory: this.f.productCategory.value,
      productType: this.f.productType.value,
      productOrigin: this.f.productOrigin.value,
      brandId: this.f.brandId.value,
    }

    this.apiService.post("/product", obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product added successfully");
          this.submitted = false;
          this.productForm.reset();
          this.ngOnInit();
        },
        error => {
          this.notificationService.openSnackBar(error);
          this.loading = false;
        });
  }

  deleteItem(id) {
    this.apiService.delete("/product/" + id,)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product removed successfully");
          this.submitted = false;
          this.productForm.reset();
          this.ngOnInit();
        },
        error => {
          this.notificationService.openSnackBar(error);
        });
  }

  editItem(id, index){
    this.editMode = true;

    this.productForm.patchValue({
      name: this.items[index].name,
      code: this.items[index].code,
      dosage: this.items[index].dosage,
      narcoFlag: this.items[index].narcoFlag,
      productCategory: this.items[index].product_category._id,
      productOrigin: this.items[index].product_origin._id,
      productType: this.items[index].product_type._id,
      brandId: this.items[index].brandId._id
    });

    this.selectedItemId = id;
  }

  updateProduct(){
    this.submitted = true;

    if (this.f.name.invalid || this.f.code.invalid) {
      return;
    }

    this.loading = true;

    let obj = [
      {propName: "name", value: this.f.name.value},
      {propName: "code", value: this.f.code.value},
      {propName: "dosage", value: this.f.dosage.value},
      {propName: "narcoFlag", value: this.f.narcoFlag.value},
      {propName: "product_category", value: this.f.productCategory.value},
      {propName: "product_origin", value: this.f.productOrigin.value},
      {propName: "product_type", value: this.f.productType.value},
      {propName: "branchId", value: this.f.brandId.value}
    ];

    this.apiService.patch("/product/" + this.selectedItemId , obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product updated successfully");
          this.submitted = false;
          this.productForm.reset();
          this.ngOnInit();
        },
        error => {
          if(error == 'Product already added'){
            this.notificationService.openSnackBar("Product updated successfully");
          }
          else{
            this.notificationService.openSnackBar(error);
          }
          this.loading = false;
        });
  }
}
