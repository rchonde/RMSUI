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
  selector: "app-data-entry",
  templateUrl: "data-entry.component.html",
  styleUrls : ["data-entry.component.css"]
})
export class DataEntryComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  isReadonly = true;
  _TemplateList :any;
  _DepartmentList : any;
  _BranchList:any;
  _HeaderList:any;
  _ColNameList:any;
  _IndexList:any;
  TempField:any;
  TemplateList:any;
  DataEntryForm: FormGroup;
  InwardForm: FormGroup;  
  submitted = false;
  _DeptList:any;
  Reset = false;
  sMsg: string = '';
  // FS2: string = '';
  // FS1: string = '';
  // FS3: string = '';
  // FS4: string = '';
  // FS5: string = '';
  // FS6: string = '';
  // FS7: string = '';
  // FS8: string = '';
  // FS9: string = '';
  // FS10: string = '';
  // FS11: string = '';
  // FS12: string = '';
  // FS13: string = '';
  // FS14: string = '';
  // FS15: string = '';
  // FS16: string = '';
  // FS17: string = '';
  // FS18: string = '';
  // FS19: string = '';

  _FileNo:any=""; 
  _PageNo:number=1;
  FilePath:any="../assets/1.pdf";
  isDisabled = false;
   
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
    this.DataEntryForm = this.formBuilder.group({
      FileNo: ['', Validators.required],
      Division: [0, Validators.required],      
      CompanyID: [0, Validators.required],
      DocID: [0, Validators.required],
      SACKCODE: ['', Validators.required],
      Viewer:1,
       
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,
      PageCount:0,
        
      Status:[''],
      Remark:[''],
      
      Status1:[''],
      Remark1:[''],
      Status2:[''],
      Remark2:[''],
      Status3:[''],
      Remark3:[''],
      Status4:[''],
      Remark4:[''],

      Status5:[''],
      Remark5:[''],
      Status6:[''],
      Remark6:[''],
      Status7:[''],
      Remark7:[''],
      Status8:[''],
      Remark8:[''],
      Status9:[''],
      Remark9:[''],
      Status10:[''],
      Remark10:[''],
      Status11:[''],
      Remark11:[''],
      Status12:[''],
      Remark12:[''],

      Status13:[''],
      Remark13:[''],
      Status14:[''],
      Remark14:[''],
      Status15:[''],
      Remark15:[''],

      Status16:[''],
      Remark16:[''],
      Status17:[''],
      Remark17:[''],
      Status18:[''],
      Remark18:[''],

      Status19:[''],
      Remark19:[''],
      Accept:[''],
      FS1:[''],
      FS2:[''],
      FS3:[''],
      FS4:[''],
      FS5:[''],
      FS6:[''],      
      FS7:[''],
      FS8:[''],
      FS9:[''],
      FS10:[''],
      FS11:[''],
      FS12:[''],
      FS13:[''],
      FS14:[''],
      FS15:[''],
      FS16:[''],
      FS17:[''],
      FS18:[''],
      FS19:[''],
    });

    this.InwardForm = this.formBuilder.group({
      FileNo: ['', Validators.required],
      CompanyID: ["0", Validators.required],
      SenderName:['', Validators.required],
      Location:['', Validators.required],
      Territorycode:['', Validators.required],

      TerrName:['', Validators.required],
      Region:['', Validators.required],
      Zone:['', Validators.required],
      State:['', Validators.required],
      MobileNo:['', Validators.required],
      EmailID:['', Validators.required],     
      Division: [0, Validators.required],  
      FULLFIRMNAME :['', Validators.required],
      CartonNo :['', Validators.required],
      PODNO :['', Validators.required],

      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') , 
      
    });
    
    this._PageNo=1;
    //console.log("IndexListPending");
    this.GetIndexListPending(0);
    this.geDoctypeList();
    this.DataEntryForm.controls['CompanyID'].setValue("0");
    this.isReadonly = false;  

    this.isDisabled = false;
  }

  
  geDoctypeList() {
    
    //const apiUrl=this._global.baseAPIUrl+'BranchMapping/GetList?user_Token=123123'
    const apiUrl = this._global.baseAPIUrl + 'DocTypeMapping/GetDocTypeDetailsUserWise?ID=' + localStorage.getItem('UserID') + '&user_Token='+this.DataEntryForm.get('User_Token').value
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
      this._DeptList = data;
      this.DataEntryForm.controls['DocID'].setValue(0);
    //  console.log("_DeptList",this._DeptList);

      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }

  
  get f() { return this.DataEntryForm.controls; }
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

    // getBranchList() {

    // const apiUrl=this._global.baseAPIUrl+'BranchMaster/GetBranchList?user_Token='+ this.DataEntryForm.get('User_Token').value;
    // this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
    // this._BranchList = data;
    // this.DataEntryForm.controls['BranchID'].setValue(0);

    // //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    // });

    // }

    GetIndexListPending(CompanyID:number) {     
     

      const apiUrl = this._global.baseAPIUrl + 'Inward/GetPendingData?CompanyID='+CompanyID+ '&user_Token='+ localStorage.getItem('User_Token');
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
      this._IndexPendingList = data;
      this._FilteredList = data
   //  console.log("IndexListPending",data);
        //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
      });
    }
    
    ViewFile(filename:any)
    {
      filename = this.DataEntryForm.get('FileNo').value +'_'+ filename;
     // filename = this.DataEntryForm.get('FileNo').value +'_'+ filename +".pdf"
     // alert (this.DataEntryForm.get('FileNo').value);
        var _Fpath =  "../assets/"+ filename;  
        this.FilePath =_Fpath;

        this.GetFullFile(filename);
    }
   

    GetNextFile()
    {

    let  __FileNo = this.DataEntryForm.controls['FileNo'].value;
    let  __TempID = this.DataEntryForm.controls['TemplateID'].value;

    const apiUrl=this._global.baseAPIUrl+'DataEntry/GetNextFile?id='+__TempID+'&FileNo='+__FileNo+'&user_Token='+ localStorage.getItem('User_Token');

    //const apiUrl=this._global.baseAPIUrl+'DataEntry/GetNextFile?id'+  + '' FileNo='+ __FileNo + '&user_Token=123123'
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
    //this._TagDetailsList = data;
    //  console.log("Next Record",data);
    // this._ColNameList = data;

    if (data !="")
    {
       // this.onEdit(data);
    }
    else
    {
      this.toastr.show(
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message"> No record Found </span></div>',
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


    }

    });
    //this.FileTaggingForm.controls['DocID'].setValue(0);
    }
 

    OnReset()
    {
    this.Reset = true;
    this.DataEntryForm.reset();
    
    this.isReadonly = false;
    this.ResetFields();
    // this.DataEntryForm.controls['User_Token'].setValue(localStorage.getItem('User_Token')); 
    // this.DataEntryForm.controls['UserID'].setValue(localStorage.getItem('UserID'));    
    // this.DataEntryForm.controls['CreatedBy'].setValue(localStorage.getItem('UserID'));  
    }

ResetFields()
{

  this.DataEntryForm.patchValue({
           
    Remark1:"",
    Remark2:"",
    Remark3:"",
    Remark4:"",
    Remark5:"",
    Remark6:"",
    Remark7:"",
    Remark8:"",
    Remark9:"",
    Remark10:"",
    Remark11:"",
    Remark12:"",
    Remark13:"",
    Remark14:"",
    Remark15:"",
    Remark16:"",
    Remark17:"",
    Remark18:"",
    Remark19:"",
    Status:0,
    Status1:0,
    Status2:0,
    Status3:0,
    Status4:0,
    Status5:0,
    Status6:0,
    Status7:0,
    Status8:0,
    Status9:0,
    Status10:0,
    Status11:0,
    Status12:0,
    Status13:0,
    Status14:0,
    Status15:0,
    Status16:0,
    Status17:0,
    Status18:0,
    Status19:0,
  })

}
  

    validateFields() {
      let isValidDateFormat = true;
      let textFieldRequiredValidation = true;
      let NumericFieldValidation = true;
      let textFieldLetterValidation = true;

      this._ColNameList.forEach((el, index) => {
        if(el.FieldType === '3') { // Date Format check
          if(!this.checkDateFormat(this.DataEntryForm.get('_ColNameList').value[el.DisplayName])) {
            isValidDateFormat = false;
            this.toastr.show(
              '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : Please select date in dd-mm-yyyy format</span></div>',
              "",
              {
                timeOut: 5000,
                closeButton: true,
                enableHtml: true,
                tapToDismiss: false,
                titleClass: "alert-title",
                positionClass: "toast-top-center",
                toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify"
              }
            );
          }
        }
        if(el.FieldType === '1' && el.IsMandatory === '1') { // Text field required validation check
          if(this.DataEntryForm.get('_ColNameList').value[el.DisplayName] === '') {
            textFieldRequiredValidation = false;
            this.toastr.show(
              '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : This field is required</span></div>',
              "",
              {
                timeOut: 5000,
                closeButton: true,
                enableHtml: true,
                tapToDismiss: false,
                titleClass: "alert-title",
                positionClass: "toast-top-center",
                toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify"
              }
            );
          }
        }

        if(el.FieldType === '1') { // Text field letter validation check
          if(!(/^[a-z][a-z\s]*$/.test(this.DataEntryForm.get('_ColNameList').value[el.DisplayName]))) {
            textFieldLetterValidation = false;
            this.toastr.show(
              '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : Only letters are allowed</span></div>',
              "",
              {
                timeOut: 5000,
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

        if(el.FieldType === '2') { // Numeric field validation check
            if(isNaN(this.DataEntryForm.get('_ColNameList').value[el.DisplayName])) {
              NumericFieldValidation = false;
              this.toastr.show(
                '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : Please enter numbers only </span></div>',
                "",
                {
                  timeOut: 5000,
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
      });
      if(isValidDateFormat && textFieldRequiredValidation && NumericFieldValidation && textFieldLetterValidation) {
        return true;
      } else {
        return false;
      }
    }

    checkDateFormat(date) {
      if(date == 'Invalid Date') {
        return false;
      }
      return true;
    }

    onSubmit() {
    this.submitted = true;

     if(!this.FileValidation()) {
       return;
     }

     if(!this.ValidationHoldCases()) {
      return;
    }


     

    // if (this.DataUploadForm.invalid) {

    //   alert("Please Fill the Fields");
    //   return;
    // }\

  //  // console.log('Form', this.DataEntryForm);
  //   var submit_data = this.DataEntryForm.value
  //   submit_data.FieldValues = []
  //   var obj = {}
  //   Object.keys(this.DataEntryForm.get('_ColNameList').value).forEach(key => {  
  //     if(this.DataEntryForm.get('_ColNameList').value[key] instanceof Date) {
  //       const dateObj = this.DataEntryForm.get('_ColNameList').value[key];
  //       const dd = dateObj.getDate() > 9 ? '' + dateObj.getDate() : '0' + dateObj.getDate();
  //       const mm = dateObj.getMonth() + 1 > 9 ? '' + parseInt(dateObj.getMonth() + 1) : '0' + parseInt(dateObj.getMonth() + 1);
  //       const yyyy = dateObj.getFullYear();
  //       obj[key] = dd + '-' + mm + '-' + yyyy;
  //       this.DataEntryForm.get('_ColNameList').value[key] = dd + '-' + mm + '-' + yyyy;
  //     } else {   
  //       obj[key] = this.DataEntryForm.get('_ColNameList').value[key]
  //     }
  //   })
  //   submit_data.FieldValues.push(obj)
  // //  console.log('Form Value', submit_data);
  //   this.DataEntryForm.patchValue({
  //   currentPage: this._PageNo ,
    
  //   PageCount:this._TotalPages,
  //   User_Token: localStorage.getItem('User_Token') ,
  //   CreatedBy: localStorage.getItem('UserID') ,
  //   di:submit_data,   
  //   FVals:submit_data.FieldValues,         
  //   });

  //   // submit_data._ColNameList.forEach(obj_elm => {
  //   //   submit_data.FieldValues.push(obj_elm)
  //   // });
  //   //console.log('Form Value', submit_data);

  this.DataEntryForm.patchValue({
    Accept: 'Hold',
     
  });

    const that = this;
    const apiUrl = this._global.baseAPIUrl + 'DataEntry/Create';
    this._onlineExamService.postData(this.DataEntryForm.value,apiUrl)
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
    that.GetIndexListPending(0);
    //this.OnReset();      
    });
    // }

    }

    hidepopup()
{
 // this.modalService.hide;
  this.modalRef.hide();
  //this.modalRef.hide
}
  

onApporve() { 


  this.submitted = true;

  // if (this.DataEntryForm.get('SACKCODE').value =="")
  // {
  //          this.showmessage("Please Enter SACK CODE");
  //           return false;
  // }
 
  this.DataEntryForm.patchValue({
    Accept: 'Verify',
     
  });



  const that = this;
  const apiUrl = this._global.baseAPIUrl + 'DataEntry/Create';
  this._onlineExamService.postData(this.DataEntryForm.value,apiUrl)
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
  that.GetIndexListPending(0);
  //this.OnReset();      
  });
  // }

  }
 
//;

Editinward(template: TemplateRef<any>, row: any) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;
  
 this.InwardForm.patchValue({
    FileNo: row.FileNo,
    Division:row.Division,
    Company:row.Company,
    SenderName:row.SenderName,
    Location:row.Location,
    Territorycode:row.Territorycode,
    TerrName:row.TerrName,
    Region:row.Region,
    Zone:row.Zone,
    State:row.State,
    MobileNo:row.MobileNo,
    EmailID:row.EmailID,
    FULLFIRMNAME:row.FULLFIRMNAME,
    PODNO:row.PODNO,
    CartonNo:row.CartonNo,

  })
  
this.modalRef = this.modalService.show(template); 
this.GetVerificationData(row.FileNo);
   
}

    AddIndexing(template: TemplateRef<any>, row: any) {
      var that = this;
     // console.log("row----",row);
     /// this.FilePath = row.FilePath;
      this.DataEntryForm.patchValue({
        FileNo: row.FileNo,        
        Remark1:"",
        Remark2:"",
        Remark3:"",
        Remark4:"",
        Remark5:"",
        Remark6:"",
        Remark7:"",
        Remark8:"",
        Remark9:"",
        Remark10:"",
        Remark11:"",
        Remark12:"",
        Remark13:"",
        Remark14:"",
        Remark15:"",
        Remark16:"",
        Remark17:"",
        Remark18:"",
        Remark19:"",
        Status:0,
        Status1:0,
        Status2:0,
        Status3:0,
        Status4:0,
        Status5:0,
        Status6:0,
        Status7:0,
        Status8:0,
        Status9:0,
        Status10:0,
        Status11:0,
        Status12:0,
        Status13:0,
        Status14:0,
        Status15:0,
        Status16:0,
        Status17:0,
        Status18:0,
        Status19:0,
      })

     // this.FilePath = row.FilePath;
      this._TotalPages = row.PageCount;   
      this._PageNo=1;

     /// console.log('FilePath', row.FilePath);
     // console.log('form', this.AddBranchForm);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
     
     // console.log('form', this.AddBranchForm);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    this.modalRef = this.modalService.show(template);
    
      //this.GetFullFile(row.FileNo);
     this.GetVerificationData(row.FileNo);
     this.GetFullFileSamePage(row.FileNo+"_1");
  }

      GetFullFile(FileNo:any) {

      //  console.log("Doc", doc);
       /// this.FilePath = doc.RelPath;
        //console.log("Row**",doc);
        const apiUrl = this._global.baseAPIUrl + 'SearchFileStatus/GetFullFile?ID='+localStorage.getItem('UserID')+'&&_fileName='+ FileNo +'&user_Token='+localStorage.getItem('User_Token');
        this._onlineExamService.getDataById(apiUrl).subscribe(res => {
          if (res) {
    
         // console.log("res",res);
            this.FilePath = res;
            window.open(res, '_blank');
             /// saveAs(res, row.ACC + '.pdf');
    
          }
        });
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
        if (key == "FileNo" ||  key == "FULLFIRMNAME" ||  key == "Territorycode") {
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

  onSendMail()
  {

    console.log(this.selectedEntries);
    const apiUrl = this._global.baseAPIUrl + 'Inward/SendMailHoldCases?FileNo='+ this.selectedEntries +'&user_Token='+localStorage.getItem('User_Token');
    this._onlineExamService.getDataById(apiUrl).subscribe(res => {
      if (res) {

     // console.log("res",res);
        this.FilePath = res;
         /// saveAs(res, row.ACC + '.pdf');

      }
    });


  }

  onEditData() {
    this.submitted = true;
    
    // if(!this.validation()) {
    //   return;
    // } 
  

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
    this.OnReset();  
    this.hidepopup();    
    });
    // }

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

        if (this.InwardForm.get('CompanyID').value <=0 )
        {
                 this.showmessage("Please Select CompanyID");
                  return false;
        }
        if (this.InwardForm.get('Division').value <=0 )
        {
                 this.showmessage("Please Select Division");
                  return false;
        }

        if (this.InwardForm.get('SenderName').value =="" )
        {
                 this.showmessage("Please Enter SenderName");
                  return false;
        }
        if (this.InwardForm.get('Location').value =="" )
        {
                 this.showmessage("Please Enter Location");
                  return false;
        }
        if (this.InwardForm.get('Territorycode').value =="" )
        {
                 this.showmessage("Please Enter Territorycode");
                  return false;
        }
        if (this.InwardForm.get('TerrName').value =="" )
        {
                 this.showmessage("Please Enter TerrName");
                  return false;
        }
        if (this.InwardForm.get('EmailID').value =="" )
        {
                 this.showmessage("Please Enter EmailID");
                  return false;
        }
        return true;
  
    } 
  
    GetVerificationData(filename:any)
    {
      const apiUrl = this._global.baseAPIUrl + 'DataEntry/GetFileInfo?FileNo='+filename+ '&user_Token='+ localStorage.getItem('User_Token');
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
      //this._IndexPendingList = data;
     var _that = data;
     console.log(data);
     if(Array.isArray(data)) {

      data.forEach((element, index) => {
        console.log("DocID" , data[index].DocID);
        const statusControl: any = 'Status' + (index + 1);
        const remarkControl: any = 'Remark' + (index + 1);
        const FStatus: any = 'FS' + (index + 1);
        //const FStatus: any = 'FS' + (data[index].DocID);
        this.DataEntryForm.controls[statusControl].setValue(data[index].Status);
        this.DataEntryForm.controls[remarkControl].setValue(data[index].Remark);
        this.DataEntryForm.controls[FStatus].setValue(data[index].FileUploadStatus);
       // this.FS[1] = data[index].FileUploadStatus;
      });
    }
     console.log(data);

     

      // this.DataEntryForm.patchValue({
        
       

      //   :data,
      //   Remark2:"",
      //   Remark3:"",
      //   Remark4:"",
      //   Remark5:"",
      //   Remark6:"",
      //   Remark7:"",
      //   Remark8:"",
      //   Remark9:"",
      //   Remark10:"",
      //   Remark11:"",
      //   Remark12:"",
      //   Remark13:"",
      //   Remark14:"",
      //   Remark15:"",
      //   Remark16:"",
      //   Remark17:"",
      //   Remark18:"",
      //   Remark19:"",
      //   Status:0,
      //   Status1:0,
      //   Status2:0,
      //   Status3:0,
      //   Status4:0,
      //   Status5:0,
      //   Status6:0,
      //   Status7:0,
      //   Status8:0,
      //   Status9:0,
      //   Status10:0,
      //   Status11:0,
      //   Status12:0,
      //   Status13:0,
      //   Status14:0,
      //   Status15:0,
      //   Status16:0,
      //   Status17:0,
      //   Status18:0,
      //   Status19:0,
      // })
       
      });


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


    FileValidation()
    {
      if (this.DataEntryForm.get('Status1').value <=0 )
      {
                this.showmessage("Please Select Status of Doc Type Customer Agreement");
                return false;
      }
      if (this.DataEntryForm.get('Status2').value <=0 )
      {
              this.showmessage("Please Select Status of Doc Type PAN");
                return false;
    }
    if (this.DataEntryForm.get('Status3').value <=0 )
    {
              this.showmessage("Please Select Status of Doc Type PARTNERSHIP DEED/MOA");
              return false;
    }
    if (this.DataEntryForm.get('Status4').value <=0 )
    {
            this.showmessage("Please Select Status of Doc Type Signing authority");
              return false;
  }
  if (this.DataEntryForm.get('Status5').value <=0 )
  {
            this.showmessage("Please Select Status of Doc Type Adhaar copy");
            return false;
  }
  if (this.DataEntryForm.get('Status6').value <=0 )
  {
          this.showmessage("Please Select Status of Doc  Type GST/Non GST Declaration");
            return false;
  }
  
  if (this.DataEntryForm.get('Status7').value <=0 )
  {
          this.showmessage("Please Select Status of Doc  Type Pesticides License ");
          return false;
  }
  
  if (this.DataEntryForm.get('Status8').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Seed License  ");
          return false;
  }
  if (this.DataEntryForm.get('Status9').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Fertilizer License ");
          return false;
  }
  if (this.DataEntryForm.get('Status10').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Business policy ");
          return false;
  }
  if (this.DataEntryForm.get('Status11').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Cheques");
          return false;
  }
  if (this.DataEntryForm.get('Status12').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Cheque annexure ");
          return false;
  }
  if (this.DataEntryForm.get('Status13').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Bank statement ");
          return false;
  }
  if (this.DataEntryForm.get('Status14').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Signing authority annexure ");
          return false;
  }
  if (this.DataEntryForm.get('Status15').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Relationship annexure  ");
          return false;
  }
  if (this.DataEntryForm.get('Status16').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Letter Heads");
          return false;
  }
  
  if (this.DataEntryForm.get('Status17').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Balance Sheet ");
          return false;
  }
  if (this.DataEntryForm.get('Status18').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Profit & Loss statement ");
          return false;
  }
  if (this.DataEntryForm.get('Status19').value <=0 )
  {
          this.showmessage("Please Select Status of Doc Type Other documents");
          return false;
  }
  
  return true;
  
    }


    ValidationHoldCases()
    {

      // alert(this.DataEntryForm.get('Status1').value);
      // alert(this.DataEntryForm.get('Remark1').value);

      if (this.DataEntryForm.get('Status1').value ==3  && this.DataEntryForm.get('Remark1').value ==null)
      {
                this.showmessage("Please Enter remark of Doc Type Customer Agreement");
                return false;
      }
      if (this.DataEntryForm.get('Status2').value ==3  && this.DataEntryForm.get('Remark2').value ==null)
      {
              this.showmessage("Please Select Status of Doc Type PAN");
                return false;
    }
    if (this.DataEntryForm.get('Status3').value ==3  && this.DataEntryForm.get('Remark3').value==null)
    {
              this.showmessage("Please Select Status of Doc Type PARTNERSHIP DEED/MOA");
              return false;
    }
    if (this.DataEntryForm.get('Status4').value ==3  && this.DataEntryForm.get('Remark4').value ==null)
    {
            this.showmessage("Please Select Status of Doc Type Signing authority");
              return false;
  }
  if (this.DataEntryForm.get('Status5').value ==3  && this.DataEntryForm.get('Remark5').value ==null)
  {
            this.showmessage("Please Select Status of Doc Type Adhaar copy");
            return false;
  }
  if (this.DataEntryForm.get('Status6').value ==3  && this.DataEntryForm.get('Remark6').value ==null)
  {
          this.showmessage("Please Select Status of Doc  Type GST/Non GST Declaration");
            return false;
  }
  
  if (this.DataEntryForm.get('Status7').value ==3  && this.DataEntryForm.get('Remark7').value ==null)
  {
          this.showmessage("Please Select Status of Doc  Type Pesticides License ");
          return false;
  }
  
  if (this.DataEntryForm.get('Status8').value ==3  && this.DataEntryForm.get('Remark8').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Seed License  ");
          return false;
  }
  if (this.DataEntryForm.get('Status9').value ==3  && this.DataEntryForm.get('Remark9').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Fertilizer License ");
          return false;
  }
  if (this.DataEntryForm.get('Status10').value ==3  && this.DataEntryForm.get('Remark10').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Business policy ");
          return false;
  }
  if (this.DataEntryForm.get('Status11').value ==3  && this.DataEntryForm.get('Remark11').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Cheques");
          return false;
  }
  if (this.DataEntryForm.get('Status12').value ==3  && this.DataEntryForm.get('Remark12').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Cheque annexure ");
          return false;
  }
  if (this.DataEntryForm.get('Status13').value ==3  && this.DataEntryForm.get('Remark13').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Bank statement ");
          return false;
  }
  if (this.DataEntryForm.get('Status14').value ==3  && this.DataEntryForm.get('Remark14').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Signing authority annexure ");
          return false;
  }
  if (this.DataEntryForm.get('Status15').value ==3  && this.DataEntryForm.get('Remark15').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Relationship annexure  ");
          return false;
  }
  if (this.DataEntryForm.get('Status16').value ==3  && this.DataEntryForm.get('Remark16').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Letter Heads");
          return false;
  }
  
  if (this.DataEntryForm.get('Status17').value ==3  && this.DataEntryForm.get('Remark17').value ==null)
  {
          this.showmessage("Please Select Status of Doc Type Balance Sheet ");
          return false;
  }
  if (this.DataEntryForm.get('Status18').value ==3  && this.DataEntryForm.get('Remark18').value ==null)
  {
          this.showmessage("Please Enter remark of  Doc Type Profit & Loss statement ");
          return false;
  }
  if (this.DataEntryForm.get('Status19').value ==3  && this.DataEntryForm.get('Remark19').value ==null)
  {
          this.showmessage("Please Enter remark of Doc Type Other documents");
          return false;
  }
  
  return true;
  
    }

   
    ongetTerritorycode() {

      let  Territorycode = this.InwardForm.controls['Territorycode'].value;
       // let  __TempID = this.InwardForm.controls['TemplateID'].value;  
        const apiUrl=this._global.baseAPIUrl+'Inward/GetTerritorycode?FileNo='+Territorycode+'&user_Token='+ localStorage.getItem('User_Token')+'&CompanyID='+ this.InwardForm.controls['CompanyID'].value;
    
        this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
                
      //    this.FilePath = data[0].FilePath;
      
          //  this.FilePath = data[0].BranchID;
          //this.FilePath = data[0].DEPTID;
        //  this.InwardForm.controls['DeptID'].setValue(data[0].DeptID);
          this.InwardForm.controls['TerrName'].setValue(data[0].TerrName);
          this.InwardForm.controls['Location'].setValue(data[0].Location);
          this.InwardForm.controls['Region'].setValue(data[0].Region);
          this.InwardForm.controls['Zone'].setValue(data[0].Zone);
          this.InwardForm.controls['State'].setValue(data[0].State);
          this.InwardForm.controls['Division'].setValue(data[0].Division);
          //console.log("FilePath", data[0].FilePath);
  
          //this.FilePath = data[0].FilePath;
          this._TotalPages = data[0].PageCount;   
          this._PageNo=1;
    
         
       //   console.log("BranchID", data[0].BranchID);
         // console.log("DEPTID", data[0].DeptID);
  
        });
    
        }

        GetFullFileSamePage(FileNo:any) {

          //  console.log("Doc", doc);
            /// this.FilePath = doc.RelPath;
            //console.log("Row**",doc);
            const apiUrl = this._global.baseAPIUrl + 'SearchFileStatus/GetFullFile?ID='+localStorage.getItem('UserID')+'&&_fileName='+ FileNo +'&user_Token='+localStorage.getItem('User_Token');
            this._onlineExamService.getDataById(apiUrl).subscribe(res => {
              if (res) {
         //window.open(fileURL, '_blank');
             //  console.log("res",res);
                this.FilePath = res;
               // window.open(res, '_blank');
                  /// saveAs(res, row.ACC + '.pdf');
        
              }
            });
          }

}
