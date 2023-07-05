using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using API.DTOs;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExcelController : BaseApiController
    {
        [HttpGet("readexcel/{type}")]
        public ActionResult<List<ExcelDto>> ReadExcel(string type)
        {
            try
            {
                string filePath = "";
                if ("input" == type)
                    filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "Assignment 1.xlsx");
                else
                    filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "output.xlsx");

                if (System.IO.File.Exists(filePath))
                {
                    using (XLWorkbook workbook = new XLWorkbook(filePath))
                    {
                        return FetchExcelData(workbook, type);
                    }
                }
                else
                {
                    Console.WriteLine("File not found in the Resource location.");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
                return StatusCode(500, "An error occurred while reading the Excel file.");
            }
        }

        private static List<ExcelDto> FetchExcelData(XLWorkbook workbook, string type)
        {
            // reading the first worksheet
            IXLWorksheet worksheet = workbook.Worksheet(1);

            List<ExcelDto> excelDataList = new List<ExcelDto>();

            // data starts from the second row (row index 2)
            for (int row = 2, rowCount = worksheet.RowsUsed().Count(); row <= rowCount; row++)
            {
                try
                {
                    ExcelDto excelData = new ExcelDto();
                    excelData.row = row - 1;
                    excelData.Num1 = worksheet.Cell(row, 1).GetValue<int>();
                    excelData.Num2 = worksheet.Cell(row, 2).GetValue<int>();
                    excelData.Calculation = worksheet.Cell(row, 3).GetDouble();
                    excelData.formula = worksheet.Cell(row, 3).FormulaA1;

                    if("output" == type) {
                        excelData.Formula1 = worksheet.Cell(row, 3).GetDouble();
                        excelData.Formula2 = worksheet.Cell(row, 4).GetDouble();
                        excelData.Formula3 = worksheet.Cell(row, 5).GetDouble();
                    } 

                    excelDataList.Add(excelData);
                }
                catch (Exception ex)
                {
                    Debug.Write(ex);
                    // return StatusCode(500, $"An error occurred while reading data in row {row}.");
                }
            }

            return excelDataList;
        }

        [HttpPost("updateexcel")]
        public IActionResult UpdateExcel(List<ExcelDto> excelData)
        {
            try
            {
                string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "output.xlsx");
                // Load the existing workbook or create a new one if it doesn't exist
                var workbook = new XLWorkbook();
                try
                {
                    workbook = new XLWorkbook(filePath);
                }
                catch (Exception ex)
                {
                    Debug.Write(ex);
                }

                // Get the first worksheet or create a new one if it doesn't exist
                var worksheet = workbook.Worksheets.FirstOrDefault() ?? workbook.Worksheets.Add("Sheet1");

                // Clear existing data from the worksheet
                worksheet.Clear();

                // Set the column headers
                worksheet.Cell(1, 1).Value = "Num1";
                worksheet.Cell(1, 2).Value = "Num2";
                worksheet.Cell(1, 3).Value = "F1";
                worksheet.Cell(1, 4).Value = "F2";
                worksheet.Cell(1, 5).Value = "F3";
                worksheet.Cell(1, 6).Value = "F4";
                worksheet.Cell(1, 7).Value = "F6";

                // Write the data to the worksheet
                for (int i = 0; i < excelData.Count; i++)
                {
                    try
                    {
                        worksheet.Cell(i + 2, 1).Value = excelData[i].Num1;
                        worksheet.Cell(i + 2, 2).Value = excelData[i].Num2;

                        // Calculate the result using the predefined formula
                        var formula1 = $"SUM(A{i + 2}, B{i + 2})"; // Num1 + Num2
                        worksheet.Cell(i + 2, 3).FormulaA1 = formula1;
                        
                        formula1 = $"(A{i + 2} / B{i + 2} * 1000) + A{i + 2} * B{i + 2}"; // ((Num1 / Num2)*1000)+Num1*Num2
                        worksheet.Cell(i + 2, 4).FormulaA1 = formula1;
                        
                        worksheet.Cell(i + 2, 5).FormulaA1 = excelData[i].formula;

                        formula1 = $"(MIN(A{i + 2}, B{i + 2})) + A{i + 2} * B{i + 2}"; // ((Num1 / Num2)*1000)+Num1*Num2
                        worksheet.Cell(i + 2, 6).FormulaA1 = formula1;

                        formula1 = $"(A{i + 2} / B{i + 2} * 1000) + MAX(A{i + 2} , B{i + 2})"; // ((Num1 / Num2)*1000)+Num1*Num2
                        worksheet.Cell(i + 2, 7).FormulaA1 = formula1;
                    }
                    catch (Exception ex)
                    {
                        Debug.Write(ex);
                    }
                }

                // Save the workbook
                workbook.SaveAs(filePath);

                return Ok();
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
                return StatusCode(500, "An error occurred while updating the Excel file.");
            }
        }
    }
}
