import { Globalconstants } from "../../../Helper/globalconstants";
import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import noUiSlider from "nouislider";
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;
 
import Selectr from "mobius1-selectr";

import swal from "sweetalert2";
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-locationbarcode",
  templateUrl: "locationbarcode.component.html",
})
export class LocationbarcodeComponent implements OnInit {
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  LogReportForm: FormGroup;
  _SingleDepartment: any;
  submitted = false;
  Reset = false;     
  sMsg: string = '';     
  _FilteredList :any; 
  _StatusList:any;
  _HeaderList:any;
  first:any=0;
  rows:any=0;
  _ColNameList = ["LocationBarcode","DocumentNo", "EntryBy", "EntryDate"];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(
    private modalService: BsModalService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _onlineExamService: OnlineExamServiceService,
    private _global: Globalconstants,
    private http: HttpClient,
    private httpService: HttpClient
    

  ) {}
  ngOnInit() {
    this.LogReportForm = this.formBuilder.group({

  
      User_Token:  localStorage.getItem('User_Token') ,  
      CreatedBy: localStorage.getItem('UserID') ,      
    });
  
 //   this.getLogList();
 this.BindHeader(this._FilteredList, this._StatusList);
 
  }
  

  OnReset() {
    this.Reset = true;
    this.LogReportForm.reset();
  }

  onSearch()
  {
    this.getLogList();
  }

  onDownload()
  {
    this.downloadFile();
  }


  GetHeaderNames()
  {
    this._HeaderList="";
    for (let j = 0; j < this._ColNameList.length; j++) {  
         
        this._HeaderList += this._ColNameList[j] +((j <= this._ColNameList.length-2)?',':'') ;
      // headerArray.push(headers[j]);  
    }
    this._HeaderList += '\n'
    this._StatusList.forEach(stat => {
      for (let j = 0; j < this._ColNameList.length; j++) {  
        this._HeaderList += (stat[this._ColNameList[j]]) + ((j <= this._ColNameList.length-2)?',':'') ;
        // headerArray.push(headers[j]);  
      }
      this._HeaderList += '\n'
    });
      
  }
  
  downloadFile() { 
    this.GetHeaderNames()
    let csvData = this._HeaderList;     
  //  console.log(csvData) 
    if(this._StatusList.length>0) {
    let blob = new Blob(['\ufeff' +  csvData], { 
        type: 'text/csv;charset=utf-8;'
    }); 
    let dwldLink = document.createElement("a"); 
    let url = URL.createObjectURL(blob); 
    let isSafariBrowser =-1;
    // let isSafariBrowser = navigator.userAgent.indexOf( 'Safari') != -1 & amp; & amp; 
    // navigator.userAgent.indexOf('Chrome') == -1; 
    
    //if Safari open in new window to save file with random filename. 
    if (isSafariBrowser) {  
        dwldLink.setAttribute("target", "_blank"); 
    } 
    dwldLink.setAttribute("href", url); 
    dwldLink.setAttribute("download",  "LogReport" + ".csv"); 
    dwldLink.style.visibility = "hidden"; 
    document.body.appendChild(dwldLink); 
    dwldLink.click(); 
    document.body.removeChild(dwldLink); 
  } else {
    this.toastr.show(
      '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message">There should be some data before you download!</span></div>',
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-danger alert-notify"
      }
    );
  }
  }
 
  isValid() {
   // return this.LogReportForm.valid 
  }


  getLogList() {  

    const apiUrl = this._global.baseAPIUrl + 'Status/TagStatusReport';          
    this._onlineExamService.postData(this.LogReportForm.value,apiUrl)
        // .pipe(first())
    .subscribe( data => {
      this._StatusList = data;          
      this._FilteredList = data;   
      this.prepareTableData(this._FilteredList, this._StatusList);
     //console.log("Log",data);

  });


  } 

  paginate(e) {
    this.first = e.first;
    this.rows = e.rows;
  }

  // _ColNameList = ["UserName","DocumentNo", "Activity", "LogDate"];


          formattedData: any = [];
          headerList: any;
          immutableFormattedData: any;
          loading: boolean = true;
          prepareTableData(tableData, headerList) {
            let formattedData = [];
            let tableHeader: any = [
              { field: 'srNo', header: "SR NO", index: 1 },
              { field: 'DocumentNo', header: 'DOCUMENT NO', index: 3 },
              { field: 'LocationBarcode', header: 'LocationBarcode', index: 3 },
              // { field: 'Activity', header: 'ACTIVITY', index: 3 },
              { field: 'EntryDate', header: 'ENTRY DATE', index: 2 },  
              
            ];
           
        //    console.log("tableData",tableData);
            tableData.forEach((el, index) => {
              formattedData.push({
                'srNo': parseInt(index + 1),
                 'LocationBarcode': el.LocationBarcode,
                 'DocumentNo': el.DocumentNo,
                 'EntryDate': el.EntryDate,
               
               
              });
              
            });
            this.headerList = tableHeader;
            this.immutableFormattedData = JSON.parse(JSON.stringify(formattedData));
            this.formattedData = formattedData;
            this.loading = false;
            
          }
      
          searchTable($event) {
            // console.log($event.target.value);
        
            let val = $event.target.value;
            if(val == '') {
              this.formattedData = this.immutableFormattedData;
            } else {
              let filteredArr = [];
              const strArr = val.split(',');
              this.formattedData = this.immutableFormattedData.filter(function (d) {
                for (var key in d) {
                  strArr.forEach(el => {
                    if (d[key] && el!== '' && (d[key]+ '').toLowerCase().indexOf(el.toLowerCase()) !== -1) {
                      if (filteredArr.filter(el => el.srNo === d.srNo).length === 0) {
                        filteredArr.push(d);
                      }
                    }
                  });
                }
              });
              this.formattedData = filteredArr;
            }
          }
 
          BindHeader(tableData, headerList) {
            let formattedData = [];
            let tableHeader: any = [
              { field: 'srNo', header: "SR NO", index: 1 },
              { field: 'DocumentNo', header: 'DOCUMENT NO', index: 3 },
              { field: 'LocationBarcode', header: 'LOCATION BARCODE', index: 3 },
           
              { field: 'EntryDate', header: 'ENTRY DATE', index: 2 },  
              
            ];          

            this.headerList = tableHeader;
            this.immutableFormattedData = JSON.parse(JSON.stringify(formattedData));
            this.formattedData = formattedData;
            this.loading = false;
            
          }

 
}

