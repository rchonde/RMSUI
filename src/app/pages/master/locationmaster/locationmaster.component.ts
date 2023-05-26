import { Globalconstants } from "../../../Helper/globalconstants";
import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-locationmaster",
  templateUrl: "locationmaster.component.html",
})
export class LocationmasterComponent implements OnInit {
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  AddTemplateForm: FormGroup;
  _SingleDepartment: any;
  submitted = false;
  Reset = false;     
  sMsg: string = '';    
  _TemplateList :any; 
  _FilteredList :any; 
  _TempID: any =0;
  first:any=0;
  rows:any=0;

  constructor(
    private modalService: BsModalService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _onlineExamService: OnlineExamServiceService,
    private _global: Globalconstants
  ) {}
  ngOnInit() {
    this.AddTemplateForm = this.formBuilder.group({
      Location: ['', Validators.required],
      ShelfCapacity: ['', Validators.required],
      BoxCapacity: ['', Validators.required],
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,
      id:[0]
    });
    this.GetLocationlist();
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
 
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  GetLocationlist() {

  const apiUrl=this._global.baseAPIUrl+'Location/GetLcoationList?user_Token='+ localStorage.getItem('User_Token')
  this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
  this._TemplateList = data;
  this._FilteredList = data;
  this.prepareTableData(this._FilteredList, this._TemplateList);
  //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
  });
  }

  OnReset() {
    this.Reset = true;
    this.AddTemplateForm.reset({User_Token: localStorage.getItem('User_Token')});
    this.modalRef.hide();  
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.AddTemplateForm);
    if (this.AddTemplateForm.invalid) {
      alert("Please Fill the Fields");
      return;
    }
    const apiUrl = this._global.baseAPIUrl + 'Location/Update';
    this._onlineExamService.postData(this.AddTemplateForm.value,apiUrl).subscribe((data: {}) => {     
     console.log(data);
     this.toastr.show(
      '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message">Location Saved</span></div>',
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
     
     this.OnReset()
     this.GetLocationlist();
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });

    //this.studentForm.patchValue({File: formData});
  }
  deleteLocation(id: any) {
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
          this.AddTemplateForm.patchValue({
            id: id.ID
          });
          const apiUrl = this._global.baseAPIUrl + 'Location/Delete';
          this._onlineExamService.postData(this.AddTemplateForm.value,apiUrl)     
          .subscribe( data => {
              swal.fire({
                title: "Deleted!",
                text: "Location has been deleted.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-primary",
              });
              this.GetLocationlist();
            });
        }
      });
  }
  editLcoation(template: TemplateRef<any>, row: any) {
      var that = this;
      that._SingleDepartment = row;
   // console.log('data', row);
      this.AddTemplateForm.patchValue({
        id: that._SingleDepartment.ID,
        Location: that._SingleDepartment.Location,
        ShelfCapacity: that._SingleDepartment.ShelfCapacity,
        BoxCapacity: that._SingleDepartment.BoxCapacity,
      })
  //    console.log('form', this.AddTemplateForm);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    this.modalRef = this.modalService.show(template);
  }
  addLocation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
              { field: 'Location', header: 'Location', index: 3 },
              { field: 'ShelfCapacity', header: 'SHELF CAPACITY', index: 3 },
              { field: 'ShelfCapacity', header: 'SHELF AVAILABLE', index: 3 },
              { field: 'BoxCapacity', header: 'BOX CAPACITY', index: 2 },  
              { field: 'BoxCapacity', header: 'BOX AVAILABLE', index: 2 },  
           
            ];
           
        //    console.log("tableData",tableData);
            tableData.forEach((el, index) => {
              formattedData.push({
                'srNo': parseInt(index + 1),
                'Location': el.Location,                  
                 'ShelfCapacity': el.ShelfCapacity,
                 'BoxCapacity': el.BoxCapacity,
                 'ID': el.ID,
                 'id': el.id,
               
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

}
