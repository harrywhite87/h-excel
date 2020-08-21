import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  sidenav = [{ "category": "Compatibility", "function": [{ "name": "RANK function", "id": 0 }] }, { "category": "Date and time", "function": [{ "name": "DATE function", "id": 1 }, { "name": "DATEDIF function", "id": 2 }, { "name": "DATEVALUE function", "id": 3 }, { "name": "DAY function", "id": 4 }, { "name": "HOUR function", "id": 5 }, { "name": "MONTH function", "id": 6 }, { "name": "NOW function", "id": 7 }, { "name": "SECOND function", "id": 8 }, { "name": "TODAY function", "id": 9 }, { "name": "WEEKDAY function", "id": 10 }, { "name": "WEEKNUM function", "id": 11 }] }, { "category": "Information", "function": [{ "name": "INFO function", "id": 12 }, { "name": "ISBLANK function", "id": 13 }, { "name": "ISERR function", "id": 14 }, { "name": "ISERROR function", "id": 15 }, { "name": "ISEVEN function", "id": 16 }, { "name": "ISFORMULA function", "id": 17 }, { "name": "ISLOGICAL function", "id": 18 }, { "name": "ISNA function", "id": 19 }, { "name": "ISNONTEXT function", "id": 20 }, { "name": "ISNUMBER function", "id": 21 }, { "name": "ISODD function", "id": 22 }, { "name": "ISTEXT function", "id": 23 }, { "name": "SHEET function", "id": 24 }] }, { "category": "Logical", "function": [{ "name": "AND function", "id": 25 }, { "name": "IF function", "id": 26 }, { "name": "IFERROR function", "id": 27 }, { "name": "IFNA function", "id": 28 }, { "name": "IFS function", "id": 29 }, { "name": "NOT function", "id": 30 }, { "name": "OR function", "id": 31 }] }, { "category": "Lookup and reference", "function": [{ "name": "ADDRESS function", "id": 32 }, { "name": "COLUMN function", "id": 33 }, { "name": "COLUMNS function", "id": 34 }, { "name": "INDEX function", "id": 35 }, { "name": "INDIRECT function", "id": 36 }, { "name": "MATCH function", "id": 37 }, { "name": "ROW function", "id": 38 }, { "name": "ROWS function", "id": 39 }, { "name": "TRANSPOSE function", "id": 40 }, { "name": "VLOOKUP function", "id": 41 }] }, { "category": "Math and trigonometry", "function": [{ "name": "INT function", "id": 42 }, { "name": "RAND function", "id": 43 }, { "name": "ROMAN function", "id": 44 }, { "name": "ROUND function", "id": 45 }, { "name": "ROUNDDOWN function", "id": 46 }, { "name": "ROUNDUP function", "id": 47 }, { "name": "SUM function", "id": 48 }, { "name": "SUMIF function", "id": 49 }, { "name": "SUMIFS function", "id": 50 }, { "name": "SUMPRODUCT function", "id": 51 }] }, { "category": "Statistical", "function": [{ "name": "COUNT function", "id": 52 }, { "name": "COUNTA function", "id": 53 }, { "name": "COUNTBLANK function", "id": 54 }, { "name": "COUNTIF function", "id": 55 }, { "name": "COUNTIFS function", "id": 56 }, { "name": "MAX function", "id": 57 }, { "name": "MIN function", "id": 58 }] }, { "category": "Text", "function": [{ "name": "CODE function", "id": 59 }, { "name": "CONCAT function", "id": 60 }, { "name": "CONCATENATE function", "id": 61 }, { "name": "LOWER function", "id": 62 }, { "name": "MID, MIDB functions", "id": 63 }, { "name": "RIGHT, RIGHTB functions", "id": 64 }, { "name": "TRIM function", "id": 65 }, { "name": "UPPER function", "id": 66 }] }];

  ngOnInit(): void {

    // // Get the Sidebar
    // var mySidebar = document.getElementById("mySidebar");

    // // Get the DIV with overlay effect
    // var overlayBg = document.getElementById("myOverlay");

    // // Toggle between showing and hiding the sidebar, and add overlay effect
    // function w3_open() {
    //   if (mySidebar.style.display === 'block') {
    //     mySidebar.style.display = 'none';
    //     overlayBg.style.display = "none";
    //   } else {
    //     mySidebar.style.display = 'block';
    //     overlayBg.style.display = "block";
    //   }
    // }

    // // Close the sidebar with the close button
    // function w3_close() {
    //   mySidebar.style.display = "none";
    //   overlayBg.style.display = "none";
    // }
  }


}
