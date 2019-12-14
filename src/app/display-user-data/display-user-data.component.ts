import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute  } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})
export class DisplayUserDataComponent implements OnInit {

  public gridOptions;
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowData;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.columnDefs = [
      {headerName: 'ID', field: 'id'},
      {headerName: 'First Name', field: 'first_name'},
      {headerName: 'Last Name', field: 'last_name'},
      {headerName: 'Email', field: 'email'},
      {headerName: 'Zipcode', field: 'zipcode'},
      {headerName: 'Created Time', field: 'created_time'}
    ],
    // tslint:disable-next-line:semicolon
    this.rowData = []
   }

   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
    .get('http://localhost:3000/api/getcustomer')
    .subscribe(r => {
      this.rowData = r;
    });
  }

  ngOnInit() { }
}
