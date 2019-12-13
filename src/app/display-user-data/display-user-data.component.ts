import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/UserInfoModel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute  } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})
export class DisplayUserDataComponent implements OnInit {

  user: UserInfoModel = new UserInfoModel({guid: 'D21ds12x',
    customerUid: 'cust2dsa12dsa',
    first_name: 'Uddeshya',
    last_name: 'Kumar',
    email: 'kumaruddeshya03@gmail.com',
    zipcode: 560037,
    password: 'Uddeshya123'});

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  private subscriber: any;

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.http.get('http://localhost:3000/api/v1/customer/' + params.uid).subscribe((data: any) => {
        this.user = new UserInfoModel(data.customer);
      });
    });
  }
}
