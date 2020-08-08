import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-origin',
  templateUrl: './product-origin.component.html',
  styleUrls: ['./product-origin.component.css']
})
export class ProductOriginComponent implements OnInit {

  addMode: boolean;
  productOriginForm: FormGroup;
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
    this.productOriginForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(50)],
      code: ['', Validators.required, Validators.maxLength(10)],
      description: [""]
    });

    this.addMode = false;

    this.apiService.get("/product-origin")
      .subscribe((result: any) => {
        this.items = result.items;
      });
  }

  get f() { return this.productOriginForm.controls; }

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

    this.apiService.post("/product-origin", obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product origin added successfully");
          this.submitted = false;
          this.productOriginForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-origin"], );
        },
        error => {
          this.notificationService.openSnackBar(error);
          this.loading = false;
        });
  }

  deleteItem(id){
    this.apiService.delete("/product-origin/" + id,)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Product origin removed successfully");
          this.submitted = false;
          this.productOriginForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-origin"]);
        },
        error => {
          this.notificationService.openSnackBar(error);
        });
  }
}
