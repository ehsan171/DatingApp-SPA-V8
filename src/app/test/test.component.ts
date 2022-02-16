import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef } from 'ag-grid-community';
import { merge, Observable } from 'rxjs';
import { Query } from '@syncfusion/ej2-data';
import { FilteringEventArgs, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { User } from '../_models/user';
import { ResourceService } from '../_services/resource.service';
import { Resource } from '../_models/resource';
import { Allocation } from '../_models/allocation';
import * as moment from 'jalali-moment';
import { AllocationRegister } from '../_models/allocationRegister';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
class Todo {
  idTest: string;
  description: string;
  complete: boolean;
} 
class MyTable {
  day: string;
  activity: string;
  hour: number[];
  advancedTool: string;
  advancedTool2: string;
  advancedTool3: string;
  advancedTool4: string;
} 
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        // height: '200px',
        
        opacity: 1,
        display: '',
        // backgroundColor: 'yellow'
      })),
      state('closed', style({
        opacity: 0,
        height: '000px',
        display: 'none' ,
        
        // backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ]),
  ],
})
export class TestComponent implements OnInit{
  
  options = [
    {name:'OptionA', value:'1', checked:true},
    {name:'OptionB', value:'2', checked:false},
    {name:'OptionC', value:'3', checked:true}
  ]
  selectedDaysForDeletion = [
    {name:1, value:1, checked:true},
 
  ]
 
  selectedDaysForPaste = [
    {name:1, value:1, checked:true, dayName:""},
 
  ]
  selectedActivity_1_ForDay = [
    {name:1, value:1, checked:true},
 
  ]
 
  selectedActivity_2_ForDay = [
    {name:1, value:1, checked:true},
 
  ]
 
  selectedActivity_3_ForDay = [
    {name:1, value:1, checked:true},
 
  ]
 


            


  get selectedOptions() { // right now: ['1','3']
    return this.options
              .filter(opt => opt.checked)
              .map(opt => opt.value)
              
  }  
  public dataPerson: { [key: string]: Object }[] = [];
  public fieldsPerson: object = { text: 'name', value: 'id' };
  public textProducer = 'تهیه کننده';
  public data2: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Hockey', 'Rugby'];
  // set placeholder to MultiSelect input element
  public placeholder: string = 'Select games';
  public dataDay: { [key: string]: Object }[] = [];
  public fieldsDay: object = { text: 'name', value: 'id' };
  public textDay = 'انتخاب روز';
  gettingDataDays(){
   let daysName = [
     { "name":"شنبه",
        "value": 5},
     { "name":"یکشنبه",
        "value": 6},
     { "name":"دوشنبه",
        "value": 0},
     { "name":"سه شنبه",
        "value": 1},
     { "name":"چهارشنبه",
        "value": 2},
     { "name":"پنجشنبه",
        "value": 3},
     { "name":"جمعه",
        "value": 4},
      ]
      for (let index = 0; index < daysName.length; index++) {
        this.dataDay.push({ id: '', name: ''});
        this.dataDay[index]['id'] = daysName[index].value;
        this.dataDay[index]['name'] = daysName[index].name;
      }

  
  }
    @ViewChild(MatPaginator) paginator: MatPaginator;

  
  @ViewChild('checkboxForDaySelection', { static: true })
  public mulObj: MultiSelectComponent; 

  daySelectFunc(){
    console.log("2006","54545")
    console.log("2006",this.mulObj.value)
    console.log("2006",this.selectedDaysForPaste)
   
    let objIndex = this.selectedDaysForPaste.find((obj => obj.checked == true));
    this.mulObj.value.forEach(element => {
      this.selectedDaysForPaste.forEach(day=>{
        if(day.dayName==(+element+1).toString()){day.checked=true}
      })
    })
console.log("20061",objIndex)

  }
  gettingDataProducer(){

      for (let index = 0; index < 5; index++) {
        this.dataPerson.push({ id: '', firstName: '', lastName: '' });
        this.dataPerson[index]['firstName'] = "firstName #"+index;
        this.dataPerson[index]['lastName'] = "lastName #"+index;
        this.dataPerson[index]['id'] = "id #"+index;
      }
    
  
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
  







  title = 'demo-menu';

  // we create an object that contains coordinates
  menuTopLeftPosition =  {x: 0, y: 0}

  // reference to the MatMenuTrigger in the DOM
  // reference to the MatMenuTrigger in the DOM

  @ViewChild(MatMenuTrigger, { static: true })
  matMenuTrigger: MatMenuTrigger 

  /**
   * Method called when the user click with the right button
   * @param event MouseEvent, it contains the coordinates
   * @param item Our data contained in the row of the table
   */
  public onRightClick(event: MouseEvent, item: any) {
      // preventDefault avoids to show the visualization of the right-click menu of the browser
      event.preventDefault();

      // we record the mouse position in our object
      this.menuTopLeftPosition.x = event.clientX;
      this.menuTopLeftPosition.y = event.clientY;

      // we open the menu
      // we pass to the menu the information about our object
      this.matMenuTrigger.menuData = {item: item}

      // we open the menu
      this.matMenuTrigger.openMenu();

  }

  // number of lines to show for the example
  getExamples(n: number) {
    var arr = ['a', , 'c'];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
// console.log(sparseKeys); // ['0', '2']
// console.log(denseKeys);  // [0, 1, 2]
    return [ ...Array(n).keys()];
  }

math = Math;
  name = 'Angular 5';
  mouseX: number;
  mouseY: number;
  sub: any;
  box: any;
  mousedown: any;
  mouseup: any;
  clickDown: boolean = false;
  my_table2: MyTable[];
  selectedOption: string;
  selectedCapacity: number;
  constructor(
    iconRegistry: MatIconRegistry, 
    domSanitizer: DomSanitizer,
    public renderer: Renderer2,
    private resourceService: ResourceService,
  ) {

    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
    const todos: Todo[] = [
      { idTest: '123', description: 'Complete me!', complete: false },
      { idTest: '456', description: 'Complete me!2', complete: false },
      { idTest: '789', description: 'Complete me!3', complete: false },
    ];
    const my_table: MyTable[] = [
      { day: "this.RowsData[1]['hour']", activity: ' فعالیت 1، فعالیت 2،فعالیت 3', hour: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,19,20,21,22,23,24], advancedTool:'1' , advancedTool2:'1', advancedTool3:'1', advancedTool4:'1' },
      { day: 'یکشنبه', activity: 'فعالیت 2', hour: [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,180,190,200,210,220,230,240], advancedTool:'2', advancedTool2:'2' , advancedTool3:'2', advancedTool4:'2' },
      { day: 'دوشنبه', activity: 'Complete me!', hour: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,19,20,21,22,23,24], advancedTool:'3', advancedTool2:'3', advancedTool3:'3', advancedTool4:'3'  },

    ];

    this.my_table2 = [];
    this.dataSource = new MatTableDataSource(todos);
    this.dataSource2 = new MatTableDataSource(my_table);
    this.dataSource3 = new MatTableDataSource(this.my_table2);
  }

  @Input() valuesFromDetail: any;
        @Output() cancelRegister = new EventEmitter();
        header: any = [];
        RowsData: any = [];
        RowsDataForColor: any = [];
        RowsDataForEachBarname: any = [];
        IsCellClick: any = [ ]  
        IsCellClickForColor: any = [ ]  
        IsCellClickForEachBarname: any = [ ]  
        test: any = {};
        test2: any = {};
        requestVolume: number = 90;
        resourceId: string = '7';
        totalDay: number;
        totalHour: number = 25;
        year: number;
        //month: number  = +moment().locale('fa').format('mm');;
        dayName:string;
        month: number ;
        barnameId: string ="2" ;
        model: any = {};
        modelProcess: any = {};
        users: User[] = [];
        resources: Resource[] = [];
        resourceInfo: any;
        resourceInfoForColor: any;
        resourceInfoForEachBarname: any;
        activityInfoForEachBarname: any;
        resourceUnit: string;
        allocation: Allocation[] = [];
        allocationForColor: Allocation[] = [];
        allocationForEachBarname: Allocation[] = [];
        allocationActivityForEachBarname: Allocation[] = [];
        allocationRegister: AllocationRegister[] = [];
        allocationPasteRegister: AllocationRegister[] = [];
        id: any;
        selectedDayForDelete: Array<number>=[];
        selectAllDays: boolean = false;
        monthName:any = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', ];

        nameFarsi: any = ['روز'];
        ArrayRowsExtraDataset: any = [];
        isShown: boolean = false;
        selectedDayForgettingFormatForPast: number;

        uncheckedActivityFnc(item: string | number){
          this.selectedActivity_2_ForDay[item].checked=false;
          this.selectedActivity_1_ForDay[item].checked=false;
          this.selectedActivity_3_ForDay[item].checked=false;
        }
    divFunction() {
       this.isShown = !this.isShown;

    }
  
        public capacityFields: any = [];
        public yearFields: any = [];
        public monthFields: any = [];
        public resourceFields: any = [];
        public dataResource: { [key: string]: Object }[] = [];
        public fieldResource: object = { text: 'name', value: 'id' };
        public fieldMonth: object = { text: 'name', value: 'id' };
      
        
 
        public data: { [key: string]: any }[] = [];
        public yearData: { [key: string]: any }[] = [];
        public monthData: { [key: string]: any }[] = [];
        public dataTitleResource: { [key: string]: any }[] = [];

        public textResource = 'منبع';
        public textCapacity = 'ظرفیت مورد نیاز';
        public textYear = 'سال';
        public textMonth = 'ماه';

        resourceForm = new FormGroup({
          capacity: new FormControl(),
          yearFormControl: new FormControl(),
          monthFormControl: new FormControl(),
          resourceId: new FormControl('20')
    }); 

        mouseClickDown(event: { which: string | number; }){
          if(event.which == 1){
            this.clickDown = true;
            
          }
          console.log("3000mouse:   "+this.clickDown +" from down  " + event.which)
        }
        mouseClickUp(event: { which: number; }){
          if(event.which == 1){
            this.clickDown = false;
            console.log("30002mouse:   "+this.clickDown +" from down  " + event.which)
          }

        }

        gettingDataCapacity(resourceId: string ) {

          this.resourceService.getResource(resourceId).subscribe((resource: Resource[]) => {
            this.resourceInfo = resource;

            this.data=[]
            for (let index = 0; index < this.resourceInfo[0].capacity; index++) {
              this.data.push({ value: 0,  name: '' });
              this.data[index]['value'] = index + 1;
              this.data[index]['name'] = index + 1;

            }
        
            this.capacityFields = { dataSource: this.data, value: 0, text: 'name'};
            this.resourceUnit = this.resourceInfo[0].unit;
    
          }, () => {
            alert('This is from orgField');
          }
          );
      
        }
        gettingDataYearMonth() {
          var currentTime = new Date()
          var year = +moment().locale('fa').format('YYYY');
         
            for (let y = year-2; y < year+3; y++) {
              this.yearData.push({ value: y,  name: y });
       
            }

        
            this.yearFields = { dataSource: this.yearData, value: 0, text: 'name'};
      
            let month = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', ]

            month.forEach((value, index) => {
         
              this.monthData.push({ id: '' });

              this.monthData[index]['name'] = value;
              this.monthData[index]['id'] = index+1;
          });
      
            this.monthFields = { dataSource: this.monthData, value: 0, text: 'name'};
           
        }

        gettingAllocation(resourceId: string , year: number, month: number) {
          var monthNumber = month < 7 ? 31 : (month < 12 ? 30:29);
          this.totalDay = monthNumber;

          this.resourceService.getAllocations(resourceId,year,month).subscribe((allocation: Allocation[]) => {
            this.header=["hour","activity"]
          
            for (let i = 1; i <= 24;i++){
              this.header.push(i)
            }
            this.header.push('advancedTool')
            this.header.push('advancedTool2')
            this.header.push('advancedTool3')
            this.header.push('advancedTool4')
            this.RowsData = [ ]  
            this.IsCellClick = [ ]  
          
            this.allocation = allocation['allocations'];
            this.resourceInfo = allocation['test'];
            let formattedMonth = month.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })

      for (let index = 0; index <=monthNumber ; index++) { 
          

          let formattedNumber = index.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
      

          let myDate =(year.toString()+formattedMonth.toString()+formattedNumber.toString())
    

      this.test =   
                {  
                  "hour" : moment(myDate,"jYYYYjMMjDD",'fa').format('ddd, ll').slice(0, -5),
                  "activity":""
        
                }
                this.my_table2.push(      { day: moment(myDate,"jYYYYjMMjDD",'fa').format('ddd, ll').slice(0, -5), activity: ' فعالیت 1، فعالیت 2،فعالیت 3', hour: [] , advancedTool:'5', advancedTool2:'5', advancedTool3:'5', advancedTool4:'5' })
                this.dataSource3 = new MatTableDataSource(this.my_table2);
      this.test2 =   
                {  
                  "hour" : index
                }
              
              this.RowsData.push(this.test);
              this.IsCellClick.push(this.test2);
            
              
            
            }

            for (let index = 0; index <= monthNumber; index++) { 
          
              for (let index2 = 1; index2 <= 24; index2++) {
                  this.RowsData[index][index2] = this.resourceInfo[0]['resourceCapacity'];
                  this.IsCellClick [index][index2] = false;
                  // this.my_table2[index]['hour'][index2-1] = this.resourceInfo[0]['resourceCapacity'];
              }
          
                   
            }
            for (let index = 0; index < this.allocation.length; index++) {

              this.RowsData[this.allocation[index].day][this.allocation[index].hour]-=this.allocation[index].usedUnit;
              // this.IsCellClick[this.allocation[index].hour][this.allocation[index].day]=false;

              // this.my_table2[this.allocation[index].day]['hour'][this.allocation[index].hour] = this.RowsData[this.allocation[index].day][this.allocation[index].hour];

            }
            for (let index = 0; index < this.RowsData.length; index++) {

              // this.RowsData[this.allocation[index].day][this.allocation[index].hour]-=this.allocation[index].usedUnit;
              // this.IsCellClick[this.allocation[index].hour][this.allocation[index].day]=false;

              this.my_table2[index]['day'] = this.RowsData[index+1]['hour'];
              for (let i = 0; i < 24; i++){
                this.my_table2[index]['hour'][i] = this.RowsData[index+1][i+1]
              }

            }
            //this.RowsData.shift()

          }, () => {
            alert('This is from orgField');
          }
          );
          
          
          this.resourceService.getWaitingAllocationsForColor(resourceId,year,month).subscribe((allocation: Allocation[]) => {
            this.header=["hour","activity"]
          
            for (let i = 1; i <= 24;i++){
              this.header.push(i)
            }
            this.RowsDataForColor = [ ]  
        
            this.IsCellClickForColor = [ ]  
          
            this.allocationForColor = allocation['allocations'];
            this.resourceInfoForColor = allocation['test'];

      for (let index = 0; index <=monthNumber ; index++) { 
          
      this.test =   
                {  
                  "hour" : index,
                  "activity":"test1"
                }
              
      this.test2 =   
                {  
                  "hour" : index
                }
              
              this.RowsDataForColor.push(this.test);
        
              this.IsCellClickForColor.push(this.test2);
            
              
            
            }

            for (let index = 0; index <= monthNumber; index++) { 
          
              for (let index2 = 1; index2 <= 24; index2++) {
                  this.RowsDataForColor[index][index2] = this.resourceInfoForColor[0]['resourceCapacity'];
                  this.IsCellClickForColor [index][index2] = false;
              }
          
                   
            }

            for (let index = 0; index < this.allocationForColor.length; index++) {

              this.RowsDataForColor[this.allocationForColor[index].day][this.allocationForColor[index].hour]-=this.allocationForColor[index].usedUnit;

            }
            //this.RowsData.shift()

          }, () => {
            alert('This is from orgField');
          }
          );

          this.resourceService.getWaitingAllocationsForEachBarname(resourceId,year,month,this["barnameId"]).subscribe((allocation: Allocation[]) => {
            this.header=["hour", "activity"]
          
            for (let i = 1; i <= 24;i++){
              this.header.push(i)
            }
          
            this.RowsDataForEachBarname = [ ]  
            this.IsCellClickForEachBarname = [ ]  
          
            this.allocationForEachBarname = allocation['allocations'];
            this.resourceInfoForEachBarname = allocation['test'];
            this.activityInfoForEachBarname = allocation['activities'];

      for (let index = 0; index <=monthNumber ; index++) { 
          
      this.test =   
                {  
                  "hour" : index
                }
              
      this.test2 =   
                {
                  "waiting":{  
                    "hour" : index
                  },
                  "accepted":{  
                    "hour" : index
                  }
                }
              
              
              this.RowsDataForEachBarname.push(this.test);
              this.IsCellClickForEachBarname.push(this.test2);
              
              for(let activity of this.activityInfoForEachBarname){
                let act1 = (activity['activity1']) ? " فعالیت 1 " : "";
                let act2 = (activity['activity2']) ? " فعالیت 2 " : "";
                let act3 = (activity['activity3']) ? " فعالیت 3 " : "";
                 this.RowsData[activity['day']]['activity']= act1+ act2+ act3;
                 console.log("1001", act1, act2, act3)
              }
            
             
            
            }

            for (let index = 0; index <= monthNumber; index++) { 
          
              for (let index2 = 0; index2 < 24; index2++) {
                 
                  this.IsCellClickForEachBarname [index]['waiting'][index2] = false;
                  this.IsCellClickForEachBarname [index]['accepted'][index2] = null;
              }
          
                   
            }

            for (let index = 0; index < this.allocationForEachBarname.length; index++) {
              this.IsCellClickForEachBarname[this.allocationForEachBarname[index].day-1]['waiting'][this.allocationForEachBarname[index].hour]=this.allocationForEachBarname[index].finalAcceptance==null;
              this.IsCellClickForEachBarname[this.allocationForEachBarname[index].day-1]['accepted'][this.allocationForEachBarname[index].hour]=this.allocationForEachBarname[index].finalAcceptance;

            }
            //this.RowsData.shift()

          }, () => {
            alert('This is from orgField');
          }
          );
     

          this.selectedDaysForDeletion=[]
          for (let index = 1; index <=monthNumber ; index++) { 
            
            let dayTest =   
            {name:index, value:index, checked:false}
   
                    
            this.selectedDaysForDeletion.push(dayTest);
        }
          this.selectedDaysForPaste=[]
          let formattedMonth = month.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
          for (let index = 1; index <=monthNumber ; index++) { 

            let formattedNumber = index.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
        
  this.year=1400;this.month=4;
            let myDate =(year.toString()+formattedMonth.toString()+formattedNumber.toString())
            // console.log("2003",myDate)
            // console.log("2004",moment(myDate,"jYYYYjMMjDD",'fa').format('ddd, ll'))
            // console.log('2005',moment(myDate,"jYYYYjMMjDD",'fa').format('d'))

   
            // console.log("2003",this.year,this.month, index)
            let dayPaste =   
            {name:index, value:index, checked:false, dayName:moment(myDate,"jYYYYjMMjDD",'fa').format('d')}
   
                    
            this.selectedDaysForPaste.push(dayPaste);
            
        }
          this.selectedActivity_1_ForDay=[]
          for (let index = 1; index <=monthNumber ; index++) { 
            
            let activity1 =   
            {name:index, value:index, checked:false}
   
                    
            this.selectedActivity_1_ForDay.push(activity1);
            
        }
          this.selectedActivity_2_ForDay=[]
          for (let index = 1; index <=monthNumber ; index++) { 
            
            let activity2 =   
            {name:index, value:index, checked:false}
   
                    
            this.selectedActivity_2_ForDay.push(activity2);
            
        }
          this.selectedActivity_3_ForDay=[]
          for (let index = 1; index <=monthNumber ; index++) { 
            
            let activity3 =   
            {name:index, value:index, checked:false}
   
                    
            this.selectedActivity_3_ForDay.push(activity3);
            
        }
        // this.dataSource2 = new MatTableDataSource(this.RowsData);
       

      }

        onChangeRequestRes(requestResValue: number) {
          this.requestVolume = requestResValue;

         
          if (typeof this.year !== "undefined" && 
          typeof this.month !== "undefined" && 
          typeof this.resourceId !== "undefined")
          {
            this.gettingAllocation(this.resourceId,this.year,this.month);
          }

        }

        onChangeResource(deviceValue: string) {

        
        
          this.resourceId = deviceValue;
          this.gettingDataCapacity( this.resourceId)
          if (typeof this.year !== "undefined" && typeof this.month !== "undefined")
          {
              this.gettingAllocation(this.resourceId,this.year,this.month);
          }

        }
        onChangeYear(value: number) {
        
          let todayJalali = moment().locale('fa').format('YYYY');

          this.year = value;
          if (typeof this.year !== "undefined" && typeof this.month !== "undefined")
          {
              this.gettingAllocation(this.resourceId,this.year,this.month);
          }

          

        }
        onChangeMonth(valueMonth: number) {
 
          this.month = valueMonth;
        
          if (typeof this.year !== "undefined" && typeof this.month !== "undefined")
          {
              this.gettingAllocation(this.resourceId,this.year,this.month);
          }

        }

        gettingDataResource(){
          this.resourceService.getResources().subscribe((resources: Resource[]) => {
            this.resources = resources;
            for (let index = 0; index < resources.length; index++) {
              this.dataResource.push({ id: '' });

              this.dataResource[index]['name'] = resources[index].title;
              this.dataResource[index]['id'] = resources[index].id;
            }
          }, () => {
            alert('This is from member');
          }
          );
        
        }
        
        gettingResources() {
          this.resourceService.getResources().subscribe((resources: Resource[]) => {
            this.resources = resources;
          
            for (let index = 0; index < resources.length; index++) {

              this.dataTitleResource.push({ value: 0,  name: '' });
              this.dataTitleResource[index]['value'] = resources[index].id;
              this.dataTitleResource[index]['name'] = resources[index].title;
            
            }

            this.resourceFields = { dataSource: this.dataTitleResource, value: 0, text: 'name'};

            
          }, () => {
            alert('gettingDataTitle 106');
          }
          );

        }

        onCellClick(rowIndex: number,columnIndex: number){
          console.log('30001',rowIndex)
          console.log('30002',columnIndex)
          console.log('30002',this.clickDown)
          rowIndex +=1;
          if(this.clickDown){
              if(this.requestVolume <= this.RowsData[rowIndex][columnIndex])
              {
                this.IsCellClick[rowIndex-1][columnIndex] = (this.IsCellClick[rowIndex-1][columnIndex]) ? false : true;
                
              }
              const listOfObjecs = [
                { id: 1,  score: 11 },

              ];
              listOfObjecs.push( { id: rowIndex,  score: columnIndex })

              
          }
        

        }
        onCellClickSingleClick(rowIndex: number,columnIndex: number,event: { which: number; }){

          if(event.which==1){
           if(this.requestVolume <= this.RowsData[rowIndex+1][columnIndex])
              {
              
                this.IsCellClick[rowIndex][columnIndex] = (this.IsCellClick[rowIndex][columnIndex]) ? false : true;
                
              }
              const listOfObjecs = [
                { id: 1,  score: 11 },

              ];
              listOfObjecs.push( { id: rowIndex,  score: columnIndex })

              
        
            }

        }

        
        onCellClickSingleClickForPaste(rowIndex: number,columnIndex: number){
    
           if(this.requestVolume <= this.RowsData[rowIndex+1][columnIndex])
              {
              
                this.IsCellClick[rowIndex][columnIndex] = true;
                
              }
              const listOfObjecs = [
                { id: 1,  score: 11 },

              ];
              listOfObjecs.push( { id: rowIndex,  score: columnIndex })

              
        
            

        }

        


deleteRequestConform(resourceId: any, year: any, month: any, day: any, barnameId: string){
  if(confirm('آیا مطمئن هستید؟ ')) {
    this.resourceService.deleteRequestByGroup(resourceId,year,month, day, barnameId)
    .subscribe((allocation: Allocation[]) => {
      this.gettingAllocation(
        this.resourceId,
        this.year,
        this.month);

  })}else {
    alert('امکان حذف وجود ندارد');
  }

}



deleteAll(resourceId: string, year: number, month: number,  barnameId: string){

  if(confirm('آیا مطمئن هستید؟ ')) {
    for (var deleteDay of this.selectedDaysForDeletion) {
      if(deleteDay.checked){
        this.resourceService.deleteRequestByGroup(resourceId,year,month, deleteDay.value, barnameId).subscribe((allocation: Allocation[]) => {
          this.gettingAllocation(
            this.resourceId,
            this.year,
            this.month);
    
      }, () => {
        alert('امکان حذف وجود ندارد');
      }
);
}

}
  }
 
  
 

}

pasteAll(){
  

      for (var pasteDay of this.selectedDaysForPaste) {
        
        if(pasteDay.checked){         
          for(var eachHour of this.allocationPasteRegister){
            this.onCellClickSingleClickForPaste(pasteDay.value-1,eachHour.hour)
          }
          this.selectedActivity_1_ForDay[pasteDay.value].checked = this.selectedActivity_1_ForDay[this.selectedDayForgettingFormatForPast].checked
          this.selectedActivity_2_ForDay[pasteDay.value].checked = this.selectedActivity_2_ForDay[this.selectedDayForgettingFormatForPast].checked
          this.selectedActivity_3_ForDay[pasteDay.value].checked = this.selectedActivity_3_ForDay[this.selectedDayForgettingFormatForPast].checked

        }
      };

}

selectAll(){

  for (let index =0 ; index < this.selectedDaysForDeletion.length; index++) {
        this.selectedDaysForDeletion[index].checked = !this.selectAllDays;
    }

      
    


}

clickOnRadioBtn(day: number){
  this.selectedDayForDelete.push(day);

}

toggleShow() {

  this.isShown = ! this.isShown;
  
  }
        
  

        
        
copyRowPattern(dayIndex: number){
          this.selectedDayForgettingFormatForPast = dayIndex;
        
          this.allocationPasteRegister = [];

            for (let hourIndex = 0; hourIndex < this.totalHour; hourIndex++){
              if(this.IsCellClick[dayIndex-1][hourIndex]){

                this.allocationPasteRegister.push({ barnameId:"0", year:0, month:0, day:0, hour:0, usedUnit:0, resourceId:'0', isDeleted:true });
                let index =this.allocationPasteRegister.length - 1;
                this.allocationPasteRegister[index]["barnameId"] = this.barnameId;
                this.allocationPasteRegister[index].barnameId = this.barnameId;
                this.allocationPasteRegister[index].year = this.year;
                this.allocationPasteRegister[index].month = this.month;
                this.allocationPasteRegister[index].day = dayIndex  ;
                this.allocationPasteRegister[index].hour = hourIndex ;

                this.allocationPasteRegister[index].usedUnit = this.selectedCapacity;
                this.allocationPasteRegister[index].registerDate = new Date();
                this.allocationPasteRegister[index].isDeleted = false;
                this.allocationPasteRegister[index].resourceId = this.resourceId;
              }
            }
          


}

      
register(){

  this.allocationRegister = [];
  for( let dayIndex = 0; dayIndex <= this.totalDay; dayIndex++){
    for (let hourIndex = 0; hourIndex < this.totalHour; hourIndex++){
      if(this.IsCellClick[dayIndex][hourIndex]){

        this.allocationRegister.push({ barnameId:"0", year:0, month:0, day:0, hour:0, usedUnit:0, resourceId:'0', isDeleted:true });
        let index =this.allocationRegister.length - 1;
        this.allocationRegister[index].barnameId = this.barnameId;
        this.allocationRegister[index].year = this.year;
        this.allocationRegister[index].month = this.month;
        this.allocationRegister[index].day = dayIndex + 1 ;
        this.allocationRegister[index].hour = hourIndex ;

        this.allocationRegister[index].usedUnit = this.selectedCapacity;
        this.allocationRegister[index].registerDate = new Date();
        this.allocationRegister[index].isDeleted = false;
        this.allocationRegister[index].resourceId = this.resourceId;
        this.allocationRegister[index].activity1 = this.selectedActivity_1_ForDay[dayIndex+1].checked;
        this.allocationRegister[index].activity2 = this.selectedActivity_2_ForDay[dayIndex+1].checked;
        this.allocationRegister[index].activity3 = this.selectedActivity_3_ForDay[dayIndex+1].checked;
      }
    }
  }

          this.allocationRegister
          this.resourceService.registerAllocation(this.allocationRegister).subscribe(() => {

            alert('ثبت با موفقیت انجام شد.');
            this.gettingAllocation(
              this.allocationRegister[0].resourceId,
              this.allocationRegister[0].year,
              this.allocationRegister[0].month);
          }, error => {
            alert(error.error);
          }
          );


}

cancelRegisterMode(event: string){
          this.barnameId = event;
}

        public onFilteringResource: EmitType<any> =  (e: FilteringEventArgs) => {
          let queryResource = new Query();
          // frame the query based on search string with filter type.
          queryResource = (e.text !== '') ? queryResource.where('name', 'contains', e.text, true) : queryResource;
          // pass the filter data source, filter query to updateData method.
          e.updateData(this.dataResource, queryResource);
        }

        setMyStyle() {
          let styles = {
            'background':'#eb01a5',
            // 'background-image': 'url("https://getsatisfaction.com/corp/img/product/five_obstacles.png"), linear-gradient(red, yellow)',
            // 'background-repeat':'no-repeat'
          };
          return styles;
      }
        setMyStyle2() {
          let styles = {
            'background':'green',
            // 'background-image': 'url("https://getsatisfaction.com/corp/img/product/five_obstacles.png"), linear-gradient(red, yellow)',
            // 'background-repeat':'no-repeat'
          };
          return styles;
      }
        setMyStyle3() {
          let styles = {
            'background':'red',
            // 'background-image': 'url("https://getsatisfaction.com/corp/img/product/five_obstacles.png"), linear-gradient(red, yellow)',
            // 'background-repeat':'no-repeat'
          };
          return styles;
      }
  ngOnInit(): void {
    $(function(){
      $(".wrapper1").scroll(function(){
  
        $(".table_allocation").scrollLeft($(".wrapper1").scrollLeft());
      });
      $(".table_allocation").scroll(function(){
        $(".wrapper1").scrollLeft($(".table_allocation").scrollLeft());
      });
    });




    $(document).ready(function () {

      $('.example1').pDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        altField: '.observer-example-alt',
        initialValue: false,
        onSelect: function (dateText: any) {
          $('#exa2').val(dateText);
          // alert(dateText)

        }

      });

    });


    this.gettingDataProducer();
    this.gettingDataDays();
    this.gettingAllocation('7',1400,4);
    // this.gettingDataCapacity(4);
    this.gettingResources();
    this.gettingDataResource();
    this.gettingDataYearMonth();

  }


  form:FormGroup = new FormGroup({
    idTest: new FormControl(false),
    description: new FormControl(false)
  });

  formTest:FormGroup = new FormGroup({
    day: new FormControl(false),
    activity: new FormControl(false),
    hour1: new FormControl(false),
    hour2: new FormControl(false),
    hour3: new FormControl(false),
    advancedTool: new FormControl(false),
  });

  day = this.formTest.get('day');
  activity = this.formTest.get('activity');
  hour1 = this.formTest.get('hour1');
  hour2 = this.formTest.get('hour2');
  hour3 = this.formTest.get('hour3');
  advancedTool = this.formTest.get('advancedTool');
  

  idTest = this.form.get('idTest');
  description = this.form.get('description');



  columns: string[];
  columnsTest: string[];
  /**
   * Control column ordering and which columns are displayed.
   */

  columnDefinitions = [
    { def: 'idTest', label: 'ID', hide: this.idTest.value},
    { def: 'description', label: 'Description', hide: this.description.value}
  ]
  columnDefinitionsTest = [
    { def: 'day',    label:'day',  hide: this.day.value},
    { def: 'activity', label: 'Activity', hide: this.activity.value},
    { def: 'hour1',  label:'hour1', hide: this.hour1.value},
    { def: 'hour2',  label:'hour2',hide: this.hour1.value},
    { def: 'hour3',  label:'hour3',  hide: this.hour1.value},
    { def: 'hour4',  label:'hour4',  hide: this.hour1.value},
    { def: 'hour5',  label:'hour5',  hide: this.hour1.value},
    { def: 'hour6',  label:'hour6',  hide: this.hour1.value},
    { def: 'hour7',  label:'hour7',  hide: this.hour1.value},
    { def: 'hour8',  label:'hour8',  hide: this.hour1.value},
    { def: 'hour9',  label:'hour9',  hide: this.hour1.value},
    { def: 'hour10', label: 'hour10', hide: this.hour1.value},
    { def: 'hour11', label: 'hour11', hide: this.hour1.value},
    { def: 'hour12', label: 'hour12', hide: this.hour1.value},
    { def: 'hour13', label: 'hour13', hide: this.hour1.value},
    { def: 'hour14', label: 'hour14', hide: this.hour1.value},
    { def: 'hour15', label: 'hour15', hide: this.hour1.value},
    { def: 'hour16', label: 'hour16', hide: this.hour1.value},
    { def: 'hour17', label: 'hour17', hide: this.hour1.value},
    { def: 'hour18', label: 'hour18', hide: this.hour1.value},
    { def: 'hour19', label: 'hour19', hide: this.hour1.value},
    { def: 'hour20', label: 'hour20', hide: this.hour1.value},
    { def: 'hour21', label: 'hour21', hide: this.hour1.value},
    { def: 'hour22', label: 'hour22', hide: this.hour1.value},
    { def: 'hour23', label: 'hour23', hide: this.hour1.value},
    { def: 'hour24', label: 'hour24', hide: this.hour1.value},
    { def: 'advancedTool', label: 'advancedTool', hide: this.hour1.value},
    { def: 'advancedTool2', label: 'advancedTool2', hide: this.hour1.value},
    { def: 'advancedTool3', label: 'advancedTool3', hide: this.hour1.value},
    { def: 'advancedTool4', label: 'advancedTool4', hide: this.hour1.value},
  ]
  columnDefinitionsFormTest = [
    // { def: 'day',    label:'روز',  hide: this.day.value},
    { def: 'activity', label: 'فعالیت',icon:'activity.png', hide: this.activity.value},
    { def: 'hour1',   label:'صبح',icon:'sunset.png',hide: this.hour1.value},
    { def: 'hour2',  label:'عصر',icon:'morning.png',hide: this.hour1.value},
    { def: 'hour3',  label:'شب',icon:'night.png',  hide: this.hour1.value},
    { def: 'advancedTool',  label:'ابزار پیشرفته',icon:'tools.png',  hide: this.hour1.value},
    
  ]

  getDisplayedColumns() {
    console.log('20003', "test2")
    this.columns = this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
  
  getDisplayedColumnsTest() {
    console.log('20003', "test")
    this.columnsTest = this.columnDefinitionsTest.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
  
  dataSource: MatTableDataSource<Todo>;
  dataSource2: MatTableDataSource<MyTable>;
  dataSource3: MatTableDataSource<MyTable>;

  ngAfterViewInit() {
    this.dataSource3.paginator = this.paginator;

    console.log('20003', 'test3')
   let o1:Observable<boolean> = this.idTest.valueChanges;
   let o2:Observable<boolean> = this.description.valueChanges;

   merge(o1, o2).subscribe( v=>{
   this.columnDefinitions[0].hide = this.idTest.value;
   this.columnDefinitions[1].hide = this.description.value;  
      console.log('20002',this.columnDefinitions);
 
      this.getDisplayedColumns();
    
    });

    this.getDisplayedColumns();

    let o1Test:Observable<boolean> = this.day.valueChanges;
    let o2Test:Observable<boolean> = this.activity.valueChanges;
    let o3Test:Observable<boolean> = this.hour1.valueChanges;
    let o4Test:Observable<boolean> = this.hour2.valueChanges;
    let o5Test:Observable<boolean> = this.hour3.valueChanges;
    let o6Test:Observable<boolean> = this.advancedTool.valueChanges;
 
    merge(o1Test, o2Test, o3Test, o4Test, o5Test, o6Test).subscribe( v=>{
    this.columnDefinitionsTest[0].hide = this.day.value;
    this.columnDefinitionsTest[1].hide = this.activity.value;  
    this.columnDefinitionsTest[2].hide = this.hour1.value;  
    this.columnDefinitionsTest[3].hide = this.hour1.value;  
    this.columnDefinitionsTest[4].hide = this.hour1.value;  
    this.columnDefinitionsTest[5].hide = this.hour1.value;  
    this.columnDefinitionsTest[6].hide = this.hour1.value;  
    this.columnDefinitionsTest[7].hide = this.hour1.value;  
    this.columnDefinitionsTest[8].hide = this.hour1.value;  
    this.columnDefinitionsTest[9].hide = this.hour1.value;  
    this.columnDefinitionsTest[10].hide = this.hour2.value;  
    this.columnDefinitionsTest[11].hide = this.hour2.value;  
    this.columnDefinitionsTest[12].hide = this.hour2.value;  
    this.columnDefinitionsTest[13].hide = this.hour2.value;  
    this.columnDefinitionsTest[14].hide = this.hour2.value;  
    this.columnDefinitionsTest[15].hide = this.hour2.value;  
    this.columnDefinitionsTest[16].hide = this.hour2.value;  
    this.columnDefinitionsTest[17].hide = this.hour2.value;  
    this.columnDefinitionsTest[18].hide = this.hour3.value;  
    this.columnDefinitionsTest[19].hide = this.hour3.value;  
    this.columnDefinitionsTest[20].hide = this.hour3.value;  
    this.columnDefinitionsTest[21].hide = this.hour3.value;  
    this.columnDefinitionsTest[22].hide = this.hour3.value;  
    this.columnDefinitionsTest[23].hide = this.hour3.value;  
    this.columnDefinitionsTest[24].hide = this.hour3.value;  
    this.columnDefinitionsTest[25].hide = this.hour3.value;  
    this.columnDefinitionsTest[26].hide = this.advancedTool.value;  
    this.columnDefinitionsTest[27].hide = this.advancedTool.value;  
    this.columnDefinitionsTest[28].hide = this.advancedTool.value;  
    this.columnDefinitionsTest[29].hide = this.advancedTool.value;  
   
       console.log('20001',this.columnDefinitionsTest);
       console.log('200012',this.dataSource2);
  
       this.getDisplayedColumnsTest();
     });
 
     this.getDisplayedColumnsTest();
    
  }
  

  
  
  
  
  columnDefs = [
    { headerName: 'make', field: 'make' },
    { headerName: 'model', field: 'model' },
    { headerName: 'price', field: 'price' }
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];


}