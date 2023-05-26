import { Globalconstants } from "../../../Helper/globalconstants";
import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";
import { Location } from '@angular/common';
// import { Listboxclass } from '../../../Helper/Listboxclass';
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-outwardFile",
  templateUrl: "outwardFile.component.html",
  styleUrls : ["outwardFile.component.css"]
})
export class outwardFileComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  isReadonly = true;
 
  InwardForm: FormGroup;
  submitted = false;
 
  Reset = false;
  sMsg: string = '';
  _FileNo:any="";  

  _FilteredList :any; 
  _IndexPendingList:any;
  bsValue = new Date();
  constructor(
    private modalService: BsModalService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _onlineExamService: OnlineExamServiceService,
    private _global: Globalconstants,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ){}
  ngOnInit(){
  
    document.body.classList.add('data-entry');
    this.InwardForm = this.formBuilder.group({
      CartonNo: ['', Validators.required],
      FileNo: ['', Validators.required],      
      EmailID: [''], 
      ContactName: [''], 
      Status: ['Outward'],         
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,     
      
    });    
    this.isReadonly = false;    
  
    this.GetFileDetailByCartonNo();  
  }
  
  get f() { return this.InwardForm.controls; }
  get t() { return this.f.tickets as FormArray; }
  
  GetFileDetails() {

    let  FileNo = this.InwardForm.controls['FileNo'].value;
     // let  __TempID = this.InwardForm.controls['TemplateID'].value;  
      const apiUrl=this._global.baseAPIUrl+'Inward/GetFileDetails?FileNo='+FileNo+'&user_Token='+ localStorage.getItem('User_Token');
  
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
     
        console.log(data);
        if (data !="")
        {

          if (data[0].Status =="Out")
          {
            this.message("File already Out in system, You can not Outward");
            this.isReadonly= true;          
          }
          else
          {

            this.isReadonly= false;
          }


        //  console.log(data[0].Status);
       
         
        }
        else
        {
          this.isReadonly= true;   
          this.message("File not in system,You can not Outward");
         // alert('Hi'); 
        }
         
      });
  
      }
 
     
    OnReset()
    {
    // this.Reset = true;
    // this.InwardForm.reset();   
    this.InwardForm.controls['FileNo'].setValue('');  
    this.InwardForm.controls['DocumentNo'].setValue('');     
     
    }
  
  OnResetPOD()
  {
  this.Reset = true;
 // this.InwardForm.reset();   
   
}



    onSubmit() {
    this.submitted = true;
    
    if(!this.validation()) {
      return;
    }
 
    
    const apiUrl = this._global.baseAPIUrl + 'Inward/InwardEntry';
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
     
    this.GetFileDetailByCartonNo();   
    this.OnReset(); 
    });
    // }
    this.GetFileDetailByCartonNo();   
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
       
        if (this.InwardForm.get('CartonNo').value =="" )
        {
                 this.showmessage("Please Enter CartonNo");
                  return false;
        }
        if (this.InwardForm.get('FileNo').value =="" )
        {
                 this.showmessage("Please Enter FileNo");
                  return false;
        }
  
        return true;
  
    } 
 
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
   // console.log($event.target.value);

    let val = $event.target.value;
    this._FilteredList = this._IndexPendingList.filter(function (d) {
   //   console.log(d);
      for (var key in d) {
        if (key == "CartonNo" ||  key == "FileNo" ||  key == "DocumentNo") {
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

  backToPrevious() {
    this.location.back();
  }

  GetFileDetailByCartonNo() {    
    let  CartonNo = this.InwardForm.controls['CartonNo'].value;

  //  const apiUrl = this._global.baseAPIUrl + 'BranchMaster/GetBranchDetails?homeBannerID='+localStorage.getItem('UserID') + '&user_Token='+ localStorage.getItem('User_Token');
  const apiUrl = this._global.baseAPIUrl + 'Inward/GetFileDetailByCartonNo?CartonNo='+CartonNo+ '&user_Token='+ localStorage.getItem('User_Token'); 
  this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
   //var _That= JSON.stringify(data)
      this._IndexPendingList = data;
    this._FilteredList = data;
   //console.log("IndexListPending",data);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }
 

 
 

  message(data:any)
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
  "ngx-toastr alert alert-dismissible alert-success alert-notify"
  }
  );
  }

 
}
