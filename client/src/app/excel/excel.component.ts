import { Component } from '@angular/core';
import { ExcelService } from '../_services/excel.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  excelData: any;
  outputExcelData: any

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
    var response = this.excelService.readInputExcel().subscribe({
      next: response => this.excelData = response,
      error: error => console.log(error),
      complete: () => console.log('Excel Data fetched from file completed')
    });
    console.log(response);
  }

  updateExcel() {
    this.excelService.updateExcel(this.excelData).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    });;
  }

  readOutputExcel() {
    var response = this.excelService.readOutputExcel().subscribe({
      next: response => this.outputExcelData = response,
      error: error => console.log(error),
      complete: () => console.log('Output Excel Data fetched from file completed')
    });
    console.log(response);
  }
}
