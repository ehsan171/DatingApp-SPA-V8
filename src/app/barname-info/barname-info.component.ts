
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ScreenplayService } from '../_services/screenplay.service';
import { RequestService } from '../_services/request.service';
import { Person } from '../_models/person';
import { BasicData } from '../_models/basicData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgStructure } from '../_models/orgStructure';
import { Barname } from '../_models/barname';
import { ResourceService } from '../_services/resource.service';

@Component({
  selector: 'app-barname-info',
  templateUrl: './barname-info.component.html',
  styleUrls: ['./barname-info.component.css']
})
export class BarnameInfoComponent implements OnInit {
  public selectedTime: string;
 
  constructor(
    private screenplayService: ScreenplayService,
    private requestService: RequestService,
    private resourceService: ResourceService,
    private authService: AuthService,
    private router: Router
     ) { }

  

     @Input() item: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  modelProcess: any = {};
  screenplayRegForm: FormGroup;

  persons: Person[];
  groups: BasicData[];
  orgs: OrgStructure[];
  barnames: Barname[];



  public titleData: string[] = [];
  
  public dataPerson: { [key: string]: Object }[] = [];
  
  public dataProducer: { [key: string]: Object }[] = [];

  public dataBarname: { [key: string]: Object }[] = [];

  public dataGroup: { [key: string]: Object }[] = [];

  public data: { [key: string]: any }[] = [];

  public orgFields: any = [];

  public fieldsGroup: object = { text: 'name', value: 'id' };
  public fieldsBarname: object = { text: 'name', value: 'id' };


  public textProducer = 'تهیه کننده';
  public textGroup = 'گروه';
  public textBarname = 'برنامه';
  public textStatus = 'وضعیت';
  public textOrgStructure = 'شبکه';
  public textBaravord = 'شماره برآورد';


  onSave(){
  }

  
  gettingDataGroups(parentId?: number) {
    this.screenplayService.getGroups(parentId).subscribe((groups: BasicData[]) => {
      this.groups = groups;
     
      this.dataGroup=[]
      for (let index = 0; index < groups.length; index++) {
        this.dataGroup.push({ id: '', name: '' });
        this.dataGroup[index]['id']= groups[index].id;
        this.dataGroup[index]['name']= groups[index].name;
      
      }
    }, error => {
      alert('This is from group');
    }
    );

  }
  
  gettingDataBarname(parentId?: number) {
    this.requestService.getBarnameByGroup(parentId).subscribe((barnames: Barname[]) => {
      this.barnames = barnames;
    
      this.dataBarname=[]
      
      for (let index = 0; index < barnames.length; index++) {
        this.dataBarname.push({ id: '', name: '' });
        this.dataBarname[index]['id']= barnames[index].id;
        this.dataBarname[index]['name']= barnames[index].title;
     
      }
    }, error => {
      alert('This is from barname');
    }
    );

  }
  
  gettingDataBarnameById(id?: number) {

    this.requestService.getBarnameInfoById(id).subscribe((barnames: Barname[]) => {
    

      this.barnames = barnames;
     
  
    
      for (let index = 0; index < barnames.length; index++) {

        this.dataProducer.push({ id: '', name: '' });
        this.dataProducer[index]['id']= barnames[index].id;
        this.dataProducer[index]['name']= barnames[index].producers;
        this.dataProducer[index]['baravordNo'] = barnames[index].baravordNo;
    
      }
    }, error => {
      alert('This is from barname');
    }
    );
    this.cancelRegister.emit(id)
  }

  gettingDataOrgs() {

    this.screenplayService.getOrgs().subscribe((orgs: OrgStructure[]) => {
      this.orgs = orgs;
      for (let index = 0; index < orgs.length; index++) {
        this.data.push({ id: '', pid: '', name: '', hasChild: true, expanded: true });
        this.data[index]['id']= orgs[index].id;
        this.data[index]['name']= orgs[index].name;
        this.data[index]['pid']  = orgs[index].parentId;
        this.data[index]['isinner'] = orgs[index].isInner;
        this.data[index]['orgId'] = orgs[index].orgId;
        this.data[index]['hasChild'] = true;
        this.data[index]['expanded'] = false;
      }
      this.orgFields = { dataSource: this.data, value: 'id', text: 'name', parentValue: 'pid', hasChildren: 'hasChild' };

    }, error => {
      alert('This is from orgField');
    }
    );

  }

  ngOnInit() {

    this.screenplayRegForm = new FormGroup({
      Title: new FormControl('', [
        Validators.required
      ]),

      orgStructure: new FormControl('', [
        Validators.required
      ]),
      producer: new FormControl('', [
        Validators.required
      ]),
      baravordNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),
      totalNumberEpisodes: new FormControl(),
      format: new FormControl('', [
        Validators.required
      ]),
      statusId: new FormControl('', [
        Validators.required
      ]),
      genre: new FormControl('', [
        Validators.required
      ]),
      regDate: new FormControl(),

    });
   
    this.gettingDataBarnameById(0);
   
    this.gettingDataBarname(0);
 
    this.gettingDataGroups(0);

    this.gettingDataOrgs();

    this.screenplayRegForm.patchValue({
      orgStructure: []
    });
  }

  register2() {
    // if (this.screenplayRegForm.valid){
    //   this.model = Object.assign({}, this.screenplayRegForm.value);
    // }
    // this.model.name = this.skillForm.screenplayTitle[0];
    this.authService.register(this.model).subscribe(() => {
      alert('register succ...');
    }, error => {
      console.log(error[0]);
      alert('This is error from register2');
    }
    );

  }

  register() {

    const el = document.querySelector('table tr td');
    // alert((document.getElementById('exa2') as HTMLInputElement).value);
    const regDate = (document.getElementById('exa') as HTMLInputElement).value;
    const regDate2 = (document.getElementById('exa') as HTMLInputElement).dataset[0];
    const unixTimestamp = 1590020379;

    this.model.regDate = (document.getElementById('exa2') as HTMLInputElement).value;

    const date = new Date(this.model.regDate * 1);


    if (this.screenplayRegForm.valid) {
      this.model = Object.assign({}, this.screenplayRegForm.value);
      this.model.regDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

      this.screenplayService.register(this.model).subscribe(res => {

        this.modelProcess.UserId = this.authService.decodedToken?.nameid;
        this.modelProcess.Type = '3';
        this.modelProcess.Activity = 'ثبت فیلمنامه ' + this.model.Title;
        this.authService.processReg(this.modelProcess).subscribe(() => {
        }, error => {
          alert('This is error from register Process');
        }
        );

        alert('فیلمنامه «' + this.model.Title + '» با موفقیت ثبت شد.');
        this.router.navigate(['/screenplay/' + res['data'].id]);
      }, error => {
        console.log(error);

        alert(error.error);
      }
      );
    }
    else {

      alert('ثبت تمامی قسمت ها الزامی می باشد');
    }

  }

  cancel() {
    this.cancelRegister.emit(false);
    alert('cancel...');
  }

}