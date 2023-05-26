import { Globalconstants } from "../../../Helper/globalconstants";
import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import swal from "sweetalert2";
// import { Listboxclass } from '../../../Helper/Listboxclass';
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-PODEntry",
  templateUrl: "PODEntry.component.html",
  styleUrls : ["PODEntry.component.css"]
})
export class PODEntryComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  isReadonly = true;
  _TemplateList :any;   
  _IndexList:any;
  TempField:any;
  TemplateList:any;
 UserID:any;
  InwardForm: FormGroup;  
 
  submitted = false;
  _DeptList:any;
  Reset = false;
  sMsg: string = '';
  
  _FileNo:any="";
  first:any=0;
  rows:any=0
 
  _PageNo:number=1;
  FilePath:any="../assets/1.pdf";
   
// _Replacestr:any="D:/WW/14-Jully-2020/UI/src/assets";
  
  _TotalPages:any=0;
  _FileList:any;
  _FilteredList :any; 
  _IndexPendingList:any;
  bsValue = new Date();
  constructor(
    private modalService: BsModalService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _onlineExamService: OnlineExamServiceService,
    private _global: Globalconstants,
  ){}
  ngOnInit(){
    document.body.classList.add('data-entry');
   
    this.InwardForm = this.formBuilder.group({     
      PODNO: ['', Validators.required],      
      CourierName:[0, Validators.required],
      BranchID:[0, Validators.required],      
      TotalInvoicecount:['', Validators.required],
      Remark:['', Validators.required], 
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') , 
      
    });
    
     
     this.GetTerritorydata(0);     
     this.InwardForm.controls['CourierName'].setValue("0");

     this.InwardForm.controls['BranchID'].setValue("0");
this.UserID =localStorage.getItem('UserID');
     
    // this.isReadonly = false;   
  }

   
   


GetTerritorydata(PODNO:number) {    


const apiUrl = this._global.baseAPIUrl + 'Inward/GetPODDetails?PODNO='+PODNO+ '&user_Token='+ localStorage.getItem('User_Token');
this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
this._IndexPendingList = data;
this._FilteredList = data
 console.log("IndexListPending",data);

 this.prepareTableData(this._FilteredList, this._IndexPendingList);
//this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
});
}


formattedData: any = [];
headerList: any;
immutableFormattedData: any;
loading: boolean = true;
prepareTableData(tableData, headerList) {
  let formattedData = [];
  let tableHeader: any = [
    { field: 'srNo', header: "SR NO", index: 1 },
     { field: 'PODNo', header: 'PODNo', index: 2 },
     { field: 'Courier', header: 'COURIER', index: 3 },
     { field: 'BranchName', header: 'BRANCHNAME', index: 3 },
     { field: 'Invoicecount', header: 'INV COUNT', index: 3 },
     { field: 'TotalReceivedInvoicecount', header: 'RECCOUNT', index: 7 },
        { field: 'Status', header: 'STATUS', index: 3 },
  //  { field: 'department', header: 'Department', index: 4 },
  //  { field: 'docType', header: 'Doc Type', index: 5 },
    { field: 'DispatchDate', header: 'DISPATCHDATE', index: 6 },
    { field: 'PODReceivedDate', header: 'RECDATE', index: 3 },
    // { field: 'filePath', header: 'File Path', index: 3 },
  ];
  // headerList.forEach((el, index) => {
  //   tableHeader.push({
  //     field: 'metadata-' + parseInt(index+1), header: el.DisplayName, index: parseInt(5+index)
  //   })
  // })
//    console.log("tableData",tableData);
  tableData.forEach((el, index) => {
    formattedData.push({
      'srNo': parseInt(index + 1),
      'PODNo': el.PODNo,    
      'Courier': el.Courier,                  
       'BarcodeNo': el.Courier,
       'BranchName': el.BranchName,
       'Invoicecount': el.TotalInvoicecount,
       'TotalReceivedInvoicecount': el.TotalReceivedInvoicecount,
       'Status': el.Status,         
      "DispatchDate": el.DispatchDate,
    //  'department': el.DepartmentName,
      // 'docType': el.DocType,
      'PODReceivedDate': el.PODReceivedDate,
      'InvoiceID': el.InvoiceID,
      'CourierName': el.CourierName,
      'BranchID': el.BranchID,
      'Remark': el.Remark,
 
 
    });
    // headerList.forEach((el1, i) => {
    //   formattedData[index]['metadata-' + parseInt(i + 1)] = el['Ref'+ parseInt(i+1)]
    // });
  });
  this.headerList = tableHeader;
  this.immutableFormattedData = JSON.parse(JSON.stringify(formattedData));
  this.formattedData = formattedData;
  this.loading = false;
   
 // console.log(this.formattedData);

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

SendMailIDBI() {    


  const apiUrl = this._global.baseAPIUrl + 'Mail/SendMailIDBI?RN='+1;
  this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
  //this._IndexPendingList = data;
  //this._FilteredList = data
  // console.log("IndexListPending",data);
  //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
  });
  }
     
OnReset()
{
this.Reset = true;
this.InwardForm.reset();
this.isReadonly = false;
 
}

 
 

checkDateFormat(date) {
if(date == 'Invalid Date') {
  return false;
}
return true;
}

onSubmit() {
this.submitted = true;

if(!this.validation()) {
  return;
}


const that = this;
const apiUrl = this._global.baseAPIUrl + 'Inward/Create';
this._onlineExamService.postData(this.InwardForm.value,apiUrl)
// .pipe(first())
.subscribe( data => {
    
this.toastr.show(
  '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message"> '+ data +' </span></div>',
  "",
  {
    timeOut: 3000,
    closeButton: true,
    enableHtml: true,
    tapToDismiss: false,
    titleClass: "alert-title",
    positionClass: "toast-top-center",
    toastClass:
      "ngx-toastr alert alert-dismissible alert-success alert-notify"
  }
);



// this.modalRef
this.modalRef.hide();
that.GetTerritorydata(0);
//this.OnReset();      
});
// }

}

paginate(e) {
  this.first = e.first;
  this.rows = e.rows;
}

hidepopup()
{
// this.modalService.hide;
this.modalRef.hide();
//this.modalRef.hide
}
    

Editinward(template: TemplateRef<any>, row: any) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;\

 //console.log(row);
  
 this.InwardForm.patchValue({     
  PODNO:row.PODNo,
  CourierName:row.CourierName,   
  TotalInvoicecount:row.TotalInvoicecount,
  Remark:row.Remark,
  BranchID:row.BranchID,     

  })
  
this.modalRef = this.modalService.show(template); 
//this.GetVerificationData(row.FileNo);
   
}


Delete(row: any)
{


}

AddInward(template: TemplateRef<any>) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;\

 //console.log(row);
  
 this.InwardForm.patchValue({     
  PODNO:"",
  CourierName:0,   
  TotalInvoicecount:"",
  Remark:"",      

  })
  
this.modalRef = this.modalService.show(template); 
//this.GetVerificationData(row.FileNo);
   
}


AddIndexing(template: TemplateRef<any>, row: any) {
var that = this;
 
 
// console.log('form', this.AddBranchForm);
//this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
this.modalRef = this.modalService.show(template);

// this.GetFullFile(row.FileNo);
 
}
 
 
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
   // console.log($event.target.value);

    let val = $event.target.value;
    this._FilteredList = this._IndexPendingList.filter(function (d) {
    //  console.log(d);
      for (var key in d) {
        if (key == "PODNo" ||  key == "Courier" ||  key == "BranchName") {
          if (d[key].toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  ngOnDestroy() {
    document.body.classList.remove('data-entry')
  }

 

  showmessage(data:any)
  {
  this.toastr.show(
  '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Validation ! </span> <span data-notify="message"> '+ data +' </span></div>',
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
  
  validation()
  {
      // if (this.FileUPloadForm.get('BranchID').value <=0 )
      // {
      //          this.showmessage("Please Select Branch");
      //           return false;
      // }

      if (this.InwardForm.get('PODNO').value =="" )
      {
                this.showmessage("Please Enter POD No");
                return false;
      }
      if (this.InwardForm.get('CourierName').value <=0 )
      {
                this.showmessage("Please Select CourierName");
                return false;
      }      
      if (this.InwardForm.get('TotalInvoicecount').value =="" )
      {
                this.showmessage("Please Enter Total Invoice Count");
                return false;
      }      
      return true;

  } 
  
  deleteCode(row: any) {

    console.log(row);

    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary",
      })
      .then((result) => {
        if (result.value) {

          this.InwardForm.patchValue({
            PODNO: row.PODNo,
          });
        
          const apiUrl = this._global.baseAPIUrl + 'Inward/Delete';
          this._onlineExamService.postData(this.InwardForm.value,apiUrl)     
          .subscribe( data => {
              swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-primary",
              });
              this.GetTerritorydata(0);
            });
        }
      });
  }

  
  ongetTerritorycode() {

    let  PODNO = this.InwardForm.controls['PODNO'].value;
     // let  __TempID = this.InwardForm.controls['TemplateID'].value;  
      const apiUrl=this._global.baseAPIUrl+'Inward/GetPODCode?PODNo='+PODNO+'&user_Token='+ localStorage.getItem('User_Token');
  
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {             
   
        // this.InwardForm.controls['Remark'].setValue(data[0].Remark);
        // this.InwardForm.controls['CourierName'].setValue(data[0].CourierName);
        // this.InwardForm.controls['TotalInvoicecount'].setValue(data[0].TotalInvoicecount);

        // this.InwardForm.controls['Remark'].setValue(data[0].Remark);
        // this.InwardForm.controls['State'].setValue(data[0].State);
        // this.InwardForm.controls['Division'].setValue(data[0].Division);
        //console.log("FilePath", data[0].FilePath);
 

      });
  
      }


}
