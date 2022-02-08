import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { __importDefault } from 'tslib';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScreenplayService } from '../_services/screenplay.service';
import { BasicData } from '../_models/basicData';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  userRegForm: FormGroup | undefined;
  orgIds: BasicData[] | undefined;

  constructor(
              private screenplayService: ScreenplayService,
              private authService: AuthService,
              ) { }

  public dataOrgId: { [key: string]: Object }[] = [];
  public fieldsFormat: object = { text: 'name', value: 'id' };
  public textOrgId = 'ساختار سازمانی';
  public textUsername = 'نام کاربری';
  public textFirstname = 'نام';
  public textLastname = 'نام خانوادگی';

  public onFilteringFormat: EmitType<any> =  (e: FilteringEventArgs) => {
    let queryFormat = new Query();
    // frame the query based on search string with filter type.
    queryFormat = (e.text !== '') ? queryFormat.where('name', 'contains', e.text, true) : queryFormat;
    // pass the filter data source, filter query to updateData method.
    e.updateData(this.dataOrgId, queryFormat);
  }
  gettingDataFormats(){
    this.authService.getOrgIds().subscribe((orgIds: BasicData[]) => {
      this.orgIds = orgIds;
      this.dataOrgId.push({ id: '', name: ''});
      this.dataOrgId[0]['id'] = 0;
      this.dataOrgId[0]['name'] = 'Administer';
      alert('This is from OrgId 501');
      for (let index = 1; index < orgIds.length + 1; index++) {
        this.dataOrgId.push({ id: '', name: ''});
        this.dataOrgId[index]['id'] = orgIds[index - 1].id;
        this.dataOrgId[index]['name'] = orgIds[index - 1].name;
      }
    }, error => {
      alert('This is from OrgId');
    }
    );
  
  }
 
  ngOnInit() {

    this.userRegForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),

      firstname: new FormControl('', [
        Validators.required
      ]),

      lastname: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl('', [
        Validators.required
      ]),
      orgId: new FormControl('', [
        Validators.required
      ]),

  });

    this.gettingDataFormats();

  }

  register(){
    this.authService.register(this.model).subscribe(() => {
      alert('ثبت نام با موفقیت انجام شد.');

    }, error => {
      alert(error.error);
    }
    );

  }

  cancel(){
    this.cancelRegister.emit(false);
    alert('cancel...');
  }

}
