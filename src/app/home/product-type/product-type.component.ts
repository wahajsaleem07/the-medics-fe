import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  addMode: boolean;
  productTypeForm: FormGroup;
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
    this.productTypeForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(50)],
      code: ['', Validators.required, Validators.maxLength(10)],
      description: [""]
    });

    this.addMode = false;

    this.apiService.get("/product-type")
      .subscribe((result: any) => {
        this.items = result.items;
      });
  }

  get f() { return this.productTypeForm.controls; }

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

    this.apiService.post("/product-type", obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product type added successfully");
          this.submitted = false;
          this.productTypeForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-type"], );
        },
        error => {
          this.notificationService.openSnackBar(error);
          this.loading = false;
        });
  }

  deleteItem(id) {
    this.apiService.delete("/product-type/" + id,)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product type removed successfully");
          this.submitted = false;
          this.productTypeForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-type"]);
        },
        error => {
          this.notificationService.openSnackBar(error);
        });
  }
}
