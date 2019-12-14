import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {

  registered = false;
  submitted = false;
  userForm: FormGroup;
  guid: string;
  serviceErrors: any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  invalidFirstName() {
    return (this.submitted && (this.serviceErrors.first_name != null || this.userForm.controls.first_name.errors != null));
  }

  invalidLastName() {
    return (this.submitted && (this.serviceErrors.last_name != null || this.userForm.controls.last_name.errors != null));
  }

  invalidEmail() {
    return (this.submitted && (this.serviceErrors.email != null || this.userForm.controls.email.errors != null));
  }

  invalidZipcode() {
    return (this.submitted && (this.serviceErrors.zipcode != null || this.userForm.controls.zipcode.errors != null));
  }

  invalidPassword() {
    return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
  }

  onSubmit() {
    this.submitted = true;
    const bodyset = this.userForm.value;
    const now = new Date().toJSON('yyyy/MM/dd HH:mm');
    bodyset.created_time = now;

    this.http
      .post('http://localhost:3000/api/postcustomer', bodyset)
      .subscribe((data: any) => {
       if (data.status === '200') {
        this.toastr.success(data.msg, 'Toastr fun!',
        {timeOut: 2000});
        this.router.navigate(['/user_data']);
       } else {
        this.toastr.error(data.msg, 'Toastr fun!',
        {timeOut: 2000});
        console.log(data);
       }
      },
      err => {
        console.log(err);
        this.toastr.error('Server Error', 'Toastr fun!',
        {timeOut: 2000});
       // check error status code is 500, if so, do some action
      });
  }
}
