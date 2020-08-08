import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  addMode: boolean;
  brandForm: FormGroup;
  loading = false;
  submitted = false;
  items: any;
  itemStatus: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(50)],
      code: ['', Validators.required, Validators.maxLength(10)],
      address: [""],
      registrationNumber: [""],
      status: [true]
    });

    this.addMode = false;

    this.apiService.get("/brand")
      .subscribe((result: any) => {
        this.items = result.items;
        for(let i=0; i < this.items.length; i++){
          if(this.items[i].status == 'true'){
            this.items[i].statusValue = 'Active';
          }
          else{
            this.items[i].statusValue = 'Inactive';
          }
        }
      });
  }

  get f() { return this.brandForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.f.name.invalid || this.f.code.invalid) {
      return;
    }

    this.loading = true;

    let obj = {
      name: this.f.name.value,
      code: this.f.code.value,
      address: this.f.address.value,
      status: this.f.status.value,
      registrationNumber: this.f.registrationNumber.value
    }

    this.apiService.post("/brand", obj)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Brand added successfully");
          this.submitted = false;
          this.brandForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-category"], );
        },
        error => {
          this.notificationService.openSnackBar(error);
          this.loading = false;
        });
  }

  deleteItem(id) {
    this.apiService.delete("/brand/" + id,)
      .subscribe(
        data => {
          this.notificationService.openSnackBar("Brand removed successfully");
          this.submitted = false;
          this.brandForm.reset();
          this.ngOnInit();
          //this.router.navigate(["/product-category"]);
        },
        error => {
          this.notificationService.openSnackBar(error);
        });
  }
}
