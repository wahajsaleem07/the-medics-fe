import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { forkJoin, Observable } from 'rxjs';
import { Product } from '../product';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  productList: any;
  filteredOptions: Observable<Product>;
  supplierList: any;
  addMode: boolean;
  editMode: boolean;
  items: any;
  submitted: boolean;
  loading: boolean;
  currentUser: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    
    this.inventoryForm = this.formBuilder.group({
      productId: ['', [Validators.required]],
      supplierId: ['', [Validators.required]],
      manufacturerDate: ["", [Validators.required]],
      expireDate: ["", [Validators.required]],
      batchNumber: ["", [Validators.required]],
      status: [ true ],
      retailPrice: ["", Validators.required],
      salePrice: ["", Validators.required],
      totalUnits: ["", Validators.required],
      soldUnits: ["", Validators.required]
    });

    const promise1 = this.apiService.get("/product");
    const promise2 = this.apiService.get("/supplier");    

    forkJoin([promise1, promise2]).subscribe(response => {
      let result: any = response;
      this.productList = result[0].items;
      this.supplierList = result[1].items;

      this.filteredOptions = this.inventoryForm.controls.productId.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.productList.slice())
      );

    });

    this.addMode = false;
    this.editMode = false;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.apiService.get("/inventory")
      .subscribe((result: any) => {
        this.items = result.items;
        for(let i=0; i < this.items.length; i++){
          let item = this.items[i];
          item.productName = item.productId.name + " - " + item.productId.dosage;
          item.supplierName = item.supplierId.name;
        }
      });
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.productList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  get f() { return this.inventoryForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.f.invalid) {
      return;
    }

    this.loading = true;

    let obj = {
      productId: this.f.productId.value._id,
      supplierId: this.f.supplierId.value,
      branchId: "5f2405cd4fd48a2e80192b59",
      status: this.f.status.value,
      manufactureDate: this.f.manufacturerDate.value,
      expireDate: this.f.expireDate.value,
      batchNumber: this.f.batchNumber.value,
      retailPrice: this.f.retailPrice.value,
      salePrice: this.f.salePrice.value,
      totalUnits: this.f.totalUnits.value,
      soldUnits: this.f.soldUnits.value,
      createdBy: this.currentUser.username
    }
    
    this.apiService.post("/inventory", obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Item added successfully");
          this.submitted = false;
          this.inventoryForm.reset();
          this.ngOnInit();
        },
        error => {
          this.notificationService.openSnackBar(error);
          this.loading = false;
        });
  }

  deleteItem(id) {
    this.apiService.delete("/inventory/" + id,)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Item removed successfully");
          this.submitted = false;
          this.inventoryForm.reset();
          this.ngOnInit();
        },
        error => {
          this.notificationService.openSnackBar(error);
        });
  }

  displayFn(obj: any): string {
    return obj && obj.name ? obj.name + ' - ' + obj.dosage ? obj.dosage : '' : '';
  }

}
