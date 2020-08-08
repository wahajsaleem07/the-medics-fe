import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  addMode: boolean;
  productCategoryForm: FormGroup;
  loading = false;
  submitted = false;
  items: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.productCategoryForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(50)],
      code: ['', Validators.required, Validators.maxLength(10)],
      description: [""]
    });

    this.addMode = false;

    this.apiService.get("/product-category")
      .subscribe((result: any) => {
        this.items = result.items;
      });
  }

  get f() { return this.productCategoryForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.f.name.invalid || this.f.code.invalid) {
      return;
    }

    this.loading = true;
    let obj = {
      name: this.f.name.value,
      code: this.f.code.value,
      description: this.f.description.value
    }

    this.apiService.post("/product-category", obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product category added successfully");
          this.submitted = false;
          this.productCategoryForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-category"], );
        },
        error => {
          this.notificationService.openSnackBar(error);
          this.loading = false;
        });
  }

  deleteItem(id) {
    this.apiService.delete("/product-category/" + id,)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product category removed successfully");
          this.submitted = false;
          this.productCategoryForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-category"]);
        },
        error => {
          this.notificationService.openSnackBar(error);
        });
  }

}
