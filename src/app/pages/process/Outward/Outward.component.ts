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
  selector: "app-Outward",
  templateUrl: "Outward.component.html",
  styleUrls : ["Outward.component.css"]
})
export class OutwardComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  isReadonly = true;
  _PolicestationList:any;
  _DistictList:any;
  InwardForm: FormGroup;
  submitted = false;
  TempField:any;
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
      Barcode: ['', Validators.required],
      CaseNo: ['', Validators.required],
      status: ['Outward'],
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,     
      
    });    
    this.isReadonly = false;     
  
    this.GetInwardData();
    this.GetDistrictData();
  }
  
  get f() { return this.InwardForm.controls; }
  get t() { return this.f.tickets as FormArray; }
 



  GetBarcodeData() {

    let  CaseNo = this.InwardForm.controls['CaseNo'].value;
     // let  __TempID = this.InwardForm.controls['TemplateID'].value;  
      const apiUrl=this._global.baseAPIUrl+'Inward/GetBarcodeData?CaseNo='+CaseNo+'&user_Token='+ localStorage.getItem('User_Token');
  
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
                  

 if (data[0].Msg)
{
  alert (data[0].Msg);
}

        //   //this.FilePath = data[0].DEPTID;
    //var _that =  data;
//if(data.length > 0)     
     //console.log(_that.length);
     // if (data.c)
      this.InwardForm.controls['Barcode'].setValue(data[0].Barcode);
      //   this.InwardForm.controls['InvoiceNo'].setValue(data[0].InvoiceNo);
      //   this.InwardForm.controls['PODNO'].setValue(data[0].PODNO);
      //   this.InwardForm.controls['InvoiceNo'].setValue(data[0].Region);
      //   this.InwardForm.controls['VendorName'].setValue(data[0].VendorName);
      //   this.InwardForm.controls['BarcodeNo'].setValue(data[0].BarcodeNo);
      //   this.InwardForm.controls['SenderLocation'].setValue(data[0].SenderLocation);
      //   this.InwardForm.controls['InvoiceDetails'].setValue(data[0].InvoiceDetails);

        
         
      });
  
      }
 
     
    OnReset()
    {
    // this.Reset = true;
    // this.InwardForm.reset();   
    this.InwardForm.controls['Barcode'].setValue('');
    //this.InwardForm.controls['MobileNo'].setValue('');
   // this.InwardForm.controls['EmailID'].setValue('');
    this.InwardForm.controls['CaseNo'].setValue('');

    //this.InwardForm.controls['SenderName'].setValue('');
     
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
 
    
    const apiUrl = this._global.baseAPIUrl + 'BranchMaster/Create';
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
    this.GetInwardData();   
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
       
        if (this.InwardForm.get('Barcode').value =="" )
        {
                 this.showmessage("Please Enter Barcode");
                  return false;
        }
        if (this.InwardForm.get('CaseNo').value =="" )
        {
                 this.showmessage("Please Enter CaseNo");
                  return false;
        }
 
        var len = this.InwardForm.get('Barcode').value;

        if (len.length !=17 )
        {
                 this.showmessage("Please Enter Valid Barcode No of lenght 17");
                  return false;
        }

//         if (this.InwardForm.get('InvoiceID').value ==0)
//         {
//                  this.showmessage("Please select Invoice Details");
//                   return false;
//         }


        // if (this.InwardForm.get('SenderLocation').value =="" )
        // {
        //          this.showmessage("Please Enter Sender Location");
        //           return false;
        // }
        
      
        
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
        if (key == "Barcode" ||  key == "CaseNo" ||  key == "policestationname") {
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

  GetInwardData() {     
     

    const apiUrl = this._global.baseAPIUrl + 'BranchMaster/GetBranchDetails?homeBannerID='+localStorage.getItem('UserID') + '&user_Token='+ localStorage.getItem('User_Token')+ '&status=Outward';
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
   //var _That= JSON.stringify(data)
      this._IndexPendingList = data;
    this._FilteredList = data;
   //console.log("IndexListPending",data);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }

  GetDistrictData() {     
     

    const apiUrl = this._global.baseAPIUrl + 'Template/GetTemplate?user_Token='+localStorage.getItem('User_Token');
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
    this._DistictList = data;
   // this._FilteredList = data
   //console.log("IndexListPending",data);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }

  
  GetPoliceStation(DistID:number) {     
     

    const apiUrl = this._global.baseAPIUrl + 'TemplateMapping/GetBranchDetailsRegionWise?DistID='+this.InwardForm.controls['District'].value + '&user_Token='+ localStorage.getItem('User_Token');
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
    this._PolicestationList = data;
    //this._FilteredList = data
   //console.log("GetPoliceStation",data);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }

  // OnSendMail()
  // {

  //   const apiUrl = this._global.baseAPIUrl + 'Inward/PackPOD?PODNO='+this.InwardForm.controls['PODNO'].value + '&user_Token='+ localStorage.getItem('User_Token');
  //   this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
  //     this.message(data);
  
  //   });

  // }

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
