import { Component, OnInit, Input, Output } from '@angular/core';
import { Screenplay } from '../_models/screenplay';
import { ScreenplayService } from '../_services/screenplay.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

import {  EventEmitter} from '@angular/core';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { SafeScript } from '@angular/platform-browser';
import { Person } from '../_models/person';
import { BasicData } from '../_models/basicData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from '../_models/status';

@Component({
  selector: 'app-screenplay-detail',
  templateUrl: './screenplay-detail.component.html',
  styleUrls: ['./screenplay-detail.component.css']
})
export class ScreenplayDetailComponent implements OnInit {
  constructor( private screenplayService: ScreenplayService, 
               private route: ActivatedRoute,
               private authService: AuthService, ) { }
  values: any;
  screenplay: Screenplay[] | undefined;


@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
model: any = {};
  screenplayRegForm: FormGroup ;
users: User[] | undefined;
persons: Person[] | undefined;
formats: BasicData[] | undefined;
statuses: Status[] | undefined;
genres: BasicData[] | undefined;
screenplays: Screenplay[] | undefined;
screenplayTitle: [] | undefined;

// skillForm = {
// screenplayTitle: [],
// producer: [],
// totalNumberEpisodes: [],
// baravord: [],
// format: [],
// genre: [],
// };


public sportsData: string[] = [];
public titleData: string[] = [];
public text = 'عنوان فیلمنامه';

// AutoComplete End

// Producer Start ---- Producer Start ---- Producer Start ---- Producer Start ---- Producer Start ---- Producer Start ----
// Dropdown Filtering Start

// defined the array of data

// tslint:disable-next-line: member-ordering
// tslint:disable-next-line: ban-types
public dataPerson: { [key: string]: Object }[] = [];
// tslint:disable-next-line: ban-types
public dataFormat: { [key: string]: Object }[] = [];
// tslint:disable-next-line: ban-types
public dataStatus: { [key: string]: Object }[] = [];
// tslint:disable-next-line: ban-types
public dataGenre: { [key: string]: Object }[] = [];
// maps the appropriate column to fields property

public fieldsPerson: object = { text: 'name', value: 'id' };
public fieldsFormat: object = { text: 'name', value: 'id' };
public fieldsStatus: object = { text: 'name', value: 'id' };
public fieldsGenre: object = { text: 'name', value: 'id' };

// set the placeholder to the DropDownList input
public textProducer = 'تهیه کننده';
public textFormat = 'قالب';
public textStatus = 'وضعیت';
public textGenre = 'ژانر';
public textOrgStructure = 'ساختار سازمانی';

// Dropdown Filtering End
// Producer End ---- Producer End ---- Producer End ---- Producer End ---- Producer End ---- Producer End ---- Producer End ----

// Total Number Episodes Start ---- Total Number Episodes Start ---- Total Number Episodes Start ---- Total Number Episodes Start ----
public textTotalNumberEpisodes = 'تعداد قسمت ';
// Total Number Episods End ---- Total Number Episods End ---- Total Number Episods End ----

// Baravord Start --- Baravord Start --- Baravord Start --- Baravord Start --- Baravord Start --- Baravord Start ---
public textBaravord = 'شماره برآورد';

public dataScreenplay: { [key: string]: any }[] = [];
// Baravord End --- Baravord End --- Baravord End --- Baravord End --- Baravord End ---



gettingDataTitle(){
this.screenplayService.getScreenplays().subscribe((screenplays: Screenplay[]) => {
this.screenplays = screenplays;
for (let index = 0; index < screenplays.length; index++) {
this.titleData[index] = screenplays[index].title;
}
}, error => {
alert('gettingDataTitle 110');
}
);

}


gettingDataProducer(){
this.screenplayService.getPersons().subscribe((persons: Person[]) => {
this.persons = persons;
for (let index = 0; index < persons.length; index++) {
this.dataPerson.push({ id: '', firstName: '', lastName: '' });
this.dataPerson[index]['firstName'] = persons[index].firstName;
this.dataPerson[index]['lastName'] = persons[index].lastName;
this.dataPerson[index]['name'] = persons[index].firstName + ' ' + persons[index].lastName ;
this.dataPerson[index]['id'] = persons[index].id;
}
}, error => {
alert('This is from member');
}
);

}
// Bind the filter event
public onFilteringPerson: EmitType<any> =  (e: FilteringEventArgs) => {
let queryProducer = new Query();
// frame the query based on search string with filter type.
queryProducer = (e.text !== '') ? queryProducer.where('name', 'contains', e.text, true) : queryProducer;
// pass the filter data source, filter query to updateData method.
e.updateData(this.dataPerson, queryProducer);
}
// Total Number Episodes End ---- Total Number Episodes End ---- Total Number Episodes End ---- Total Number Episodes End ----





gettingDataFormats(){
this.screenplayService.getFormats().subscribe((formats: BasicData[]) => {
this.formats = formats;
for (let index = 0; index < formats.length; index++) {
this.dataFormat.push({ id: '', name: ''});
this.dataFormat[index]['id'] = formats[index].id;
this.dataFormat[index]['name'] = formats[index].name;
}
}, error => {
alert('This is from format');
}
);

}
// Bind the filter event
public onFilteringFormat: EmitType<any> =  (e: FilteringEventArgs) => {
let queryFormat = new Query();
// frame the query based on search string with filter type.
queryFormat = (e.text !== '') ? queryFormat.where('name', 'contains', e.text, true) : queryFormat;
// pass the filter data source, filter query to updateData method.
e.updateData(this.dataFormat, queryFormat);
}

// ---------------------------------STATUS START--------------------------------------


gettingDataStatuses(){
this.screenplayService.getStatuses().subscribe((statuses: Status[]) => {
this.statuses = statuses;
for (let index = 0; index < statuses.length; index++) {
this.dataStatus.push({ id: '', name: ''});
this.dataStatus[index]['id'] = statuses[index].id;
this.dataStatus[index]['name'] = statuses[index].name;
}
}, error => {
alert('This is from status');
}
);

}
// Bind the filter event
public onFilteringStatus: EmitType<any> =  (e: FilteringEventArgs) => {
let queryStatus = new Query();
// frame the query based on search string with filter type.
queryStatus = (e.text !== '') ? queryStatus.where('name', 'contains', e.text, true) : queryStatus;
// pass the filter data source, filter query to updateData method.
e.updateData(this.dataStatus, queryStatus);
}
// ---------------------------------STATUS END---------------------------------------

// ----------------------------------GENER START--------------------------------------
gettingDataGeners(){
this.screenplayService.getGenres().subscribe((genres: BasicData[]) => {
this.genres = genres;
for (let index = 0; index < genres.length; index++) {
this.dataGenre.push({ id: '', name: ''});
this.dataGenre[index]['id'] = genres[index].id;
this.dataGenre[index]['name'] = genres[index].name;
}
}, error => {
alert('This is from gettingDataGeners');
}
);

}
// Bind the filter event
public onFilteringGenre: EmitType<any> =  (e: FilteringEventArgs) => {
let queryGenre = new Query();
// frame the query based on search string with filter type.
queryGenre = (e.text !== '') ? queryGenre.where('name', 'contains', e.text, true) : queryGenre;
// pass the filter data source, filter query to updateData method.
e.updateData(this.dataGenre, queryGenre);
}
// -----------------------------------GENER END----------------------------------------




ngOnInit() {
this.screenplayRegForm = new FormGroup({
Title: new FormControl('', [
Validators.required
]),

orgStructure: new FormControl(),
producer: new FormControl(),
baravordNo: new FormControl('', [
Validators.required,
Validators.pattern( '^[0-9]*$'),
Validators.minLength(6),
Validators.maxLength(6)
]),
totalNumberEpisodes: new FormControl(),
format: new FormControl(),
statusId: new FormControl(),
genre: new FormControl(),
username: new FormControl(),
password: new FormControl(),
conformPassword: new FormControl(),
photoUrl: new FormControl(),
name: new FormControl(),

});

this.gettingDataTitle();
this.gettingDataProducer();
this.gettingDataFormats();
this.gettingDataGeners();
this.gettingDataStatuses();
this.loadScreenplay();

const newLocal = 'id';
this.values = this.route.snapshot.params[newLocal];

}

register2(){
// if (this.screenplayRegForm.valid){
//   this.model = Object.assign({}, this.screenplayRegForm.value);
// }
// this.model.name = this.skillForm.screenplayTitle[0];
this.authService.register(this.model).subscribe(() => {
alert('register succ...');
}, error => {
alert('This is error from register2');
}
);

}

register(){
this.model = Object.assign({}, this.screenplayRegForm.value);
this.screenplayService.register(this.model).subscribe(() => {
alert('register succ...');
}, error => {
alert('This is error from register sssssstest2');
}
);

}

cancel(){
this.cancelRegister.emit(false);
alert('cancel...');
}


onlyUnique(value: any, index: any, self: string | any[]) {
  return self.indexOf(value) === index;
}
loadScreenplay() {
  this.screenplayService.getScreenplay(+this.route.snapshot.params['id']).subscribe((screenplay: Screenplay[]) => {
    this.screenplay = screenplay;
    for (let index = 0; index < screenplay.length; index++) {
      this.dataScreenplay.push( {row: 0, id: 0, title: '', baravordNo: '',
      orgStructure: '', writer: '', producer: '', format: '', genre: '' });
      this.dataScreenplay[index]['row'] = index + 1;
      this.dataScreenplay[index]['id'] = screenplay[index].id;
      this.dataScreenplay[index]['title'] = screenplay[index].title;
      this.dataScreenplay[index]['orgStructure'] = screenplay[index].orgStructure;
      this.dataScreenplay[index]['baravordNo'] = screenplay[index].baravordNo;
      this.dataScreenplay[index]['writer'] = screenplay[index].writers;
      const merged = [].concat.apply([], this.dataScreenplay[index]['writer']);
      this.dataScreenplay[index]['writer'] = merged.filter( this.onlyUnique );
      this.dataScreenplay[index]['format'] = screenplay[index].format;
      this.dataScreenplay[index]['genre'] = screenplay[index].genre;
    }
  }, error => {
    alert(error);
  });
}


}
