import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  baseUrl = 'https://localhost:7007/api/';

  constructor(private http: HttpClient) { }

  readInputExcel () {
    return this.http.get(this.baseUrl + 'excel/readexcel/input');
  }

  readOutputExcel () {
    return this.http.get(this.baseUrl + 'excel/readexcel/output');
  }

  updateExcel (excelData: any) {
    return this.http.post(this.baseUrl + 'excel/updateexcel', excelData);    
  }
}
