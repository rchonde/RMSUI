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
  selector: "app-Approval",
  templateUrl: "Approval.component.html",
  styleUrls : ["Approval.component.css"]
})
export class ApprovalComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  isReadonly = true;
  _TemplateList :any;
  first:any=0;
  rows:any=0
  _HeaderList:any;
  _ColNameList:any;
  _IndexList:any;
   
  QuicksearchForm: FormGroup;
  ContentSearchForm: FormGroup;

  InwardForm: FormGroup;
  
  submitted = false;
  _DeptList:any;
  Reset = false;
  sMsg: string = '';
  
  _FileNo:any=""; 
   
  isDisabled = false;
   
// _Replacestr:any="D:/WW/14-Jully-2020/UI/src/assets";
   
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
    this.ContentSearchForm = this.formBuilder.group({
      SearchBy: ["0", Validators.required],
      FileNo: ['', Validators.required],
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,
      
    });

    this.InwardForm = this.formBuilder.group({     
      FileNo: ['', Validators.required],
      CartonNo: ['', Validators.required],
      DocumentNo: ['', Validators.required],      
      EmailID: [''],
      RequestID: [''],
      ContactName: [''],
      Status: ['Approval'],  
    //  Remark: ['', Validators.required],
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,
      
    });
    
    
    this.GetIndexListPending();
  //  this.GetFilterSearch();
    //this.geDoctypeList();
    
    this.ContentSearchForm.controls['SearchBy'].setValue("0");
    
    this.isReadonly = false;  

    this.isDisabled = false;
  }


  GetIndexListPending() {     
     

    const apiUrl = this._global.baseAPIUrl + 'BranchMaster/GetApproval?user_Token='+ localStorage.getItem('User_Token');
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
    this._IndexPendingList = data;
    this._FilteredList = data;
    this._ColNameList = data;
    this.prepareTableData(this._FilteredList, this._IndexPendingList);

   //console.log("IndexListPending",data);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }
  
  // geDoctypeList() {
    
  //   //const apiUrl=this._global.baseAPIUrl+'BranchMapping/GetList?user_Token=123123'
  //   const apiUrl = this._global.baseAPIUrl + 'DocTypeMapping/GetDocTypeDetailsUserWise?ID=' + localStorage.getItem('UserID') + '&user_Token='+this.QuicksearchForm.get('User_Token').value
  //   this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
  //     this._DeptList = data;
  //     this.QuicksearchForm.controls['DocID'].setValue(0);
  //   //  console.log("_DeptList",this._DeptList);

  //     //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
  //   });
  // }

  
  get f() { return this.QuicksearchForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}   
    GetFilterSearch() {     
     

      const apiUrl = this._global.baseAPIUrl + 'Inward/SearchRecordsByApproval?user_Token='+ localStorage.getItem('User_Token') +'&FileNo='+this.ContentSearchForm.get('FileNo').value+'&SearchBy='+this.ContentSearchForm.get('SearchBy').value;
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
      this._IndexPendingList = data;
      this._FilteredList = data
      //this._IndexPendingList = data;
      this._FilteredList = data;
      this._ColNameList = data;
      this.prepareTableData(this._FilteredList, this._IndexPendingList);


   //  console.log("IndexListPending",data);
        //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
      });
    }
  
  

    OnReset()
    {
    this.Reset = true;
    this.QuicksearchForm.reset();
    
    this.isReadonly = false;
    
    }
 
 
    checkDateFormat(date) {
      if(date == 'Invalid Date') {
        return false;
      }
      return true;
    }
 

    hidepopup()
{
 // this.modalService.hide;
  this.modalRef.hide();
  //this.modalRef.hide
}
 
    
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
   // console.log($event.target.value);

    let val = $event.target.value;

   // alert($event.target.value);
    this._FilteredList = this._IndexPendingList.filter(function (d) {
    //  console.log(d);
      for (var key in d) {
        if (key == "PODNO" ||  key == "BarcodeNo" ||  key == "InvoiceNo" ||  key == "VendorName" ||  key == "Status") {
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
 
  

    selectedEntries = [];
    allSelected = false;
    selectRow(e, fileNo) {
      if(e.target.checked) {
        this.selectedEntries.push(fileNo);
      } else {
        this.selectedEntries.splice(this.selectedEntries.indexOf(fileNo), 1);
      }

      // check if all rows are individually selected
      if(this._FilteredList.length === this.selectedEntries.length) {
        setTimeout(() => {
          this.allSelected = true;
        }, 100);
      } else {
        setTimeout(() => {
          this.allSelected = false;
        }, 100);
      }
      console.log(this.selectedEntries);
     }

    selectAll(e) {
      console.log('All files selected');
      if(e.target.checked) {
        this._FilteredList.forEach(element => {
          this.selectedEntries.push(element.FileNo);
        });
      } else {
        this.selectedEntries = [];
      }
    }
 
    paginate(e) {
      this.first = e.first;
      this.rows = e.rows;
    }
   
 
            formattedData: any = [];
            headerList: any;
            immutableFormattedData: any;
            loading: boolean = true;
            prepareTableData(tableData, headerList) {
              let formattedData = [];
              let tableHeader: any = [
                { field: 'srNo', header: "SR NO", index: 1 },
                { field: 'RequestID', header: 'Request ID', index: 3 },
                 { field: 'CartonNo', header: 'CartonNo', index: 3 },
                 { field: 'FileNo', header: 'FileNo', index: 2 },
                 { field: 'DocumentNo', header: 'DocumentNo', index: 3 },
                
                 { field: 'FileStatus', header: 'File Request', index: 3 },
                 { field: 'FileAccesstype', header: 'File Access Type', index: 3 },

                    { field: 'Status', header: 'Status', index: 3 },
                    // { field: 'InwardBy', header: 'InwardBy', index: 3 },
                    { field: 'Ref1', header: 'Ref1', index: 3 },
                    { field: 'Ref2', header: 'Ref2', index: 3 },
                    { field: 'Ref3', header: 'Ref3', index: 3 },
                    // { field: 'Ref4', header: 'Ref4', index: 3 },
                    
                    
              //  { field: 'department', header: 'Department', index: 4 },
              //  { field: 'docType', header: 'Doc Type', index: 5 },
                 { field: 'LocationBarcode', header: 'LocationBarcode', index: 6 },


                { field: 'RequestDate', header: 'RequestDate', index: 6 },
                { field: 'RequestBy', header: 'RequestBy', index: 6 },
                // { field: 'Remark', header: 'Remark', index: 6 },

                
              
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
                  'FileNo': el.FileNo,                  
                   'CartonNo': el.CartonNo,
                   'DocumentNo': el.DocumentNo,
                   'RequestID': el.RequestID,
                   'FileStatus': el.FileStatus,
                   'FileAccesstype': el.FileAccesstype,
                   
                  //  'ContactName': el.ContactName,
                   'Status': el.Status,    
                   'Ref1': el.Ref1,    
                   "Ref2": el.Ref2,     
                  "Ref3": el.Ref3,
                  "Ref4": el.Ref4,
                  "LocationBarcode": el.LocationBarcode,
                  "RequestDate": el.RequestDate,
                  "RequestBy": el.RequestBy,                 
                  "Remark": el.Remark,
                 

                  
                
            //      'filePath': el.FilePath
                //  'DocID': el.DocID,
                  // 'profileImg': el.PhotoPath
                });
                // headerList.forEach((el1, i) => {
                //   formattedData[index]['metadata-' + parseInt(i + 1)] = el['Ref'+ parseInt(i+1)]
                // });
              });
              this.headerList = tableHeader;
              this.immutableFormattedData = JSON.parse(JSON.stringify(formattedData));
              this.formattedData = formattedData;
              this.loading = false;
              

            //  console.log(this.formattedData);

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


            
Editinward(template: TemplateRef<any>, row: any) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;
  
 this.InwardForm.patchValue({      
  FileNo:row.FileNo,
  DocumentNo:row.DocumentNo,
  RequestID:row.RequestID,
  

  })
  
this.modalRef = this.modalService.show(template); 
//this.GetVerificationData(row.FileNo);
   
}

Reject( row: any)
{
  this.InwardForm.patchValue({      
    FileNo:row.FileNo,
    DocumentNo:row.DocumentNo,
    RequestID:row.RequestID,
      
    })

    const apiUrl = this._global.baseAPIUrl + 'Inward/Reject';
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
      this.GetIndexListPending();
   //   this.modalService.hide(1);
  
      // this.OnReset();   
   
  
    });


}

onSubmit() {
  this.submitted = true;
  
  if(!this.validation()) {
    return;
  }  
  const apiUrl = this._global.baseAPIUrl + 'Inward/ApproveEntry';
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
    this.GetIndexListPending();
    this.modalService.hide(1);

    // this.OnReset();   
 

  });

  // }

  }

  validation()
  {
     
      if (this.InwardForm.get('FileNo').value =="" )
      {
               this.showmessage("Please Enter File No");
                return false;
      }
      // if (this.InwardForm.get('Remark').value =="" )
      // {
      //          this.showmessage("Please Enter Remark");
      //           return false;
      // }
 
      return true;

  } 

}
