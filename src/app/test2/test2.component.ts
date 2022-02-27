import { Component, OnInit, Output, EventEmitter, Input, Renderer2 } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { User } from '../_models/user';
import { ResourceService } from '../_services/resource.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Resource } from '../_models/resource';
import { Allocation } from '../_models/allocation';
import * as moment from 'jalali-moment';
import { AllocationRegister } from '../_models/allocationRegister';
import {  trigger, state, style, animate, transition} from '@angular/animations';
  
declare var $: any;

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
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
        animate('.1s')
      ]),
    ]),
  ],
})
export class Test2Component implements OnInit {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  
  showDiv = {

  
  }

  name = 'Angular 5';
  mouseX: number;
  mouseY: number;
  sub: any;
  box: any;
  clickDown:boolean;

  selectedOption: string;
  selectedCapacity: number;

  constructor(
    public renderer: Renderer2,
    private resourceService: ResourceService) { }

  @Input() valuesFromDetail: any;
  @Output() cancelRegister = new EventEmitter();
  colors: any = [];
  colors2: any = [];
  monthName:any = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', ];

  nameFarsi: any = ['روز'];
  random: number  ;
  color: number   ;
  totalOfColumn: any = [];
  remainResourceOfColumn: any = [];
  shortageResourceOfColumn: any = [];
  
  header: any = [];
  header2: any = [];
  RowsData: any = [];
  ArrayRowsDataset: any = [];
  RejectedArrayRowsDataset: any = [];
  RowsDataForWhichDay: any = [];
  ArrayRowsDatasetForWhichDay: any = [];
  RejectedArrayRowsDatasetForWhichDay: any = [];
  RowsExtraDataset: any = [];
  ArrayRowsExtraDataset: any = [];
  RejectedArrayRowsExtraDataset: any = [];
  IsCellClick: any = [ ]  
  test: any = {};
  test2: any = {};
  requestVolume: number;
  resourceId: string = '7';
  totalDay: number;
  totalHour: number = 24;
  year: number = 1400;
  month: number = 4 ;
  counter: number = 0;

  //month: number  = +moment().locale('fa').format('mm');;
  
  barnameId: string ;
  model: any = {};
  modelProcess: any = {};
  screenplayRegForm: FormGroup;
  users: User[];
  resources: Resource[];
  resourceInfo: any;
  resourceUnit: string;
  allocation: Allocation[];
  allocationRegister: AllocationRegister[];
  id: any;
  


  public capacityFields: any = [];
  public yearFields: any = [];
  public monthFields: any = [];
  public numberDayOfMonth: any = [];
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
  public sqlGetArray: any = [];
  public sqlGetUsedResourceArray: any = [];
  div:  boolean[] = [];
  public momentHtml: any = moment;
  public capacity:number;
  public usedResource:any = [];



 

  divFunction(i: string | number): void {
    let s = this.div[i]

    this.div.forEach((value, index) => {

      this.div[index] = false;
  });
    this.div[i] = !s;

  }
  resourceForm = new FormGroup({
    capacity: new FormControl(),
    yearFormControl: new FormControl(),
    monthFormControl: new FormControl(),
    resourceId: new FormControl('20')
}); 

  mouseClickDown(event: { which: number; }){
  if(event.which == 1){
  this.clickDown = true;

  }
  }
  mouseClickUp(event: { which: number; }){
  if(event.which == 1){
  this.clickDown = false;

  }
  }

  gettingDataCapacity(resourceId: string) {

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

  gettingWaitingForAcceptAllocation(resourceId: string, year: number, month: number) {



        this.colors = [  '#ee4035', ' #f37736', '#fdf498', '#7bc043',' #0392cf', 'rgb(136,212,194) ', '	#ff6e4a', '#c3e3f5 ', '#76b3e8',  '#ee4035', ' #f37736', '#fdf498', '#7bc043',' #0392cf', 'rgb(136,212,194) ', '	#ff6e4a', '#c3e3f5 ', '#76b3e8' ];
        this.colors2 = [  '#2a4d69' , '#4b86b4' , '#adcbe3' , '#e7eff6' , '#63ace5','#e3c9c9' , '#f4e7e7' , '#eedbdb' , '#cecbcb' , '#cbdadb' ];
        this.random  = Math.floor((Math.random() * 9) + 1);
        this.color   = Math.floor((Math.random() * this.colors.length - 1) + 1);
        
        this.totalOfColumn = []  
        this.IsCellClick = [ ]  
        this.header=["hour"]
        this.header2=["نام برنامه","شبکه","تهیه کننده", "تاریخ ثبت","زمان سپری شده","درصد تداخل"]

        this.ArrayRowsDataset = []
        this.ArrayRowsDatasetForWhichDay = []
        this.ArrayRowsExtraDataset = []
        this.sqlGetArray ={}
        this.sqlGetUsedResourceArray ={}

      
        for (let i = 1; i <= 24;i++){
          this.header.push(i)
     
        }

        
        this.resourceService.getWaitingRequestAllocationsTest(resourceId,year,month).subscribe((allocation: Allocation[]) => {
           this.momentHtml.locale('fa'); 
          this.sqlGetArray=[]
          this.sqlGetUsedResourceArray=[]
        
        for (let i = 0; i < 31;i++){
          this.sqlGetArray.push({})
          this.sqlGetArray[i]=[]
     
        }

       
        for (let i = 0; i < 31;i++){
          this.sqlGetUsedResourceArray.push({})
          this.sqlGetUsedResourceArray[i]=[]
     
        }
        console.log("90009",this.sqlGetArray[31])
          this.allocation =  allocation['allocations'];
          this.capacity = allocation['capacity'];
          this.usedResource = allocation['usedResource']

         
          this.allocation.forEach(element =>{
       
           
            this.sqlGetArray[element['day']].push(element) 
            

          })
            
         
          this.usedResource.forEach((element: { [x: string]: string | number; }) =>{
       
           
            this.sqlGetUsedResourceArray[element['day']].push(element) 
            

          })
            
         
            

            console.log("90005",this.sqlGetArray)

            this.sqlGetUsedResourceArray.forEach(function (element: any) {
                console.log("90008", element);

              });
         
            
        
         
          
          
          for(let numOfDay=0; numOfDay<this.allocation.length;numOfDay++){

                    this.RowsData = [ ]
                    this.RowsDataForWhichDay = [ ]
                    this.RowsExtraDataset = [ ]

                
                    for (let index1 = -1; index1 <this.allocation[numOfDay].length; index1++) { 
                    
                        moment.locale('fa');
                        
                      let index2 =(index1 == -1 ? 0 : index1);
                      this.test =   
                                {  
                                  "hour" :this.allocation[numOfDay][index2][0]['title']
                                }
                      let test4 =   
                                {  
                                  "hour" :(this.allocation[numOfDay][index2][0]['title']>0)?1:0
                                }
                      let test3 =   
                                {  
                                  "hour" :this.allocation[numOfDay][index2][0]['title'],
                                  "day": this.allocation[numOfDay][index2][0]['day'],
                                  "year": this.allocation[numOfDay][index2][0]['year'],
                                  "month": this.allocation[numOfDay][index2][0]['month'],
                                  "monthName": this.monthName[this.allocation[numOfDay][index2][0]['month']-1],
                                  "producer" :this.allocation[numOfDay][index2][0]['producers'],
                                  "barnameId" :this.allocation[numOfDay][index2][0]['id'],
                                  "networkName" :this.allocation[numOfDay][index2][0]['network'],
                                  "networkId" :this.allocation[numOfDay][index2][0]['networkId'],
                                  // "RegDate" : this.allocation[3][index2][0]['registerDate']
                                  "duration" :  moment.from(this.allocation[numOfDay][index2][0]['registerDate'], 'en', 'YYYY-MM-DD').toNow(true),
                                  "RegDate" :  moment.from(this.allocation[numOfDay][index2][0]['registerDate'], 'en', 'YYYY-MM-DD').format('YYYY/MM/DD'),
                                  "totalDay":0,
                                  "totalConflict":0
                                }
                   
                              this.RowsData.push(this.test);
                              this.RowsDataForWhichDay.push(test4);
                            console.log("80003",index2)
                            console.log("70003",this.allocation[numOfDay])

                            
                              this.RowsExtraDataset.push(test3);
                        
                      
                            
                            
                    }
                    
                
                    for (let index = -1; index <this.allocation[numOfDay].length; index++) { 
                    
                        moment.locale('fa');
                        
                      let index2 =(index == -1 ? 0 : index);
              
                      this.test2 =   
                                {  
                                  "hour" : index
                                }
    
                   
                        
                              this.IsCellClick.push(this.test2);
                            
                            
                      }
                    
                      this.test =   
                      {  
                        "hour" :""
                      }
                      let test2={
                        "hour" :""
                      }
                      let test3={
                        "hour" : ""
                      }
                      this.totalOfColumn.push(this.test);
                      this.remainResourceOfColumn.push(test2);
                      this.shortageResourceOfColumn.push(test3);

                      for (let i = 1; i <= 24;i++){
                  
                        this.totalOfColumn[numOfDay][i]= 0;
                        this.shortageResourceOfColumn[numOfDay][i]= 0;
                        this.remainResourceOfColumn[numOfDay][i]= this.resourceInfo[0]['resourceCapacity'];
                      }
                      this.remainResourceOfColumn[numOfDay]['hour'] = "منبع آزاد"
                      this.totalOfColumn[numOfDay]['hour'] = "مجموع"
                      this.shortageResourceOfColumn[numOfDay]['hour'] = "کمبود؟"
                    
                      for (let index = 1; index < this.RowsData.length; index++) { 
                        
                              for(let j = 0 ; j < this.allocation[numOfDay][index-1].length; j++){
                                
                                (this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']]) =0 ;
                              
                              }
                              
                              for(let j = 0 ; j < (this.allocation[numOfDay][index-1].length); j++){
                              
                                    
                    
                                (this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']]) += (this.allocation[numOfDay][index-1][j]['usedUnit']) ;
                                (this.RowsDataForWhichDay[index][this.allocation[numOfDay][index-1][j]['hour']]) = ((this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']])>0)?1:0 ;
                                this.totalOfColumn[numOfDay][this.allocation[numOfDay][index-1][j]['hour']] += this.allocation[numOfDay][index-1][j]['usedUnit'];
                          
                                delete this.RowsDataForWhichDay[index].hour;
                              }
                            
                            
                      }

                      this.ArrayRowsDataset.push(this.RowsData)
                      this.ArrayRowsDatasetForWhichDay.push(this.RowsDataForWhichDay)
                      this.ArrayRowsExtraDataset.push(this.RowsExtraDataset)
                

                      this.resourceService.getFreeResourcePerHour(resourceId,year,month,this.allocation[numOfDay][0][0].day).subscribe((allocation: Allocation[]) => {
                    
                        let allocation2 = allocation['allocations'];
                        this.resourceInfo = allocation['test'];
                    
                        for(let numOfHour=0; numOfHour<this.allocation.length;numOfHour++){
                          for (let index = 0; index <allocation2.length; index++) { 
                          
                            this.remainResourceOfColumn[numOfDay][allocation2[index]['hour']] -= allocation2[index]['usedResource']
                                
                        }

                        for(let index = 0; index <24; index++){
                  
                            let dif = this.remainResourceOfColumn[numOfDay][index]-this.totalOfColumn[numOfDay][index];
                            this.shortageResourceOfColumn[numOfDay][index] =  (dif<0) ? 1 : 0;
                        
                    
                        }          
                      }

   console.log("70001",  this.ArrayRowsExtraDataset);
 
                      for(let i=0; i<this.ArrayRowsDatasetForWhichDay[numOfDay].length;i++) {
                      for(let i2 in this.ArrayRowsDatasetForWhichDay[numOfDay][i]) {
                    
                        this.ArrayRowsExtraDataset[numOfDay][i].totalDay += 1
                                            if(this.shortageResourceOfColumn[numOfDay][i2]==1){
                                              this.ArrayRowsExtraDataset[numOfDay][i].totalConflict += 1
                                            }
                        }
                      }

    
    
            //this.RowsData.shift()

          }, () => {
           alert('This is from orgField');
          }
          );
          }
  
          //this.RowsData.shift()

        }, () => {
          alert('This is from orgField');
        }
        );
        

        this.resourceService.getWaitingRequestAllocations(resourceId,year,month).subscribe((allocation: Allocation[]) => {
            
          this.allocation = allocation['allocations'];
          this.resourceInfo = allocation['test'];
          console.log("80002", this.allocation)
          
          
          for(let numOfDay=0; numOfDay<this.allocation.length;numOfDay++){

                    this.RowsData = [ ]
                    this.RowsDataForWhichDay = [ ]
                    this.RowsExtraDataset = [ ]

                
                    for (let index1 = -1; index1 <this.allocation[numOfDay].length; index1++) { 
                    
                        moment.locale('fa');
                        
                      let index2 =(index1 == -1 ? 0 : index1);
                      this.test =   
                                {  
                                  "hour" :this.allocation[numOfDay][index2][0]['title']
                                }
                      let test4 =   
                                {  
                                  "hour" :(this.allocation[numOfDay][index2][0]['title']>0)?1:0
                                }
                      let test3 =   
                                {  
                                  "hour" :this.allocation[numOfDay][index2][0]['title'],
                                  "day": this.allocation[numOfDay][index2][0]['day'],
                                  "year": this.allocation[numOfDay][index2][0]['year'],
                                  "month": this.allocation[numOfDay][index2][0]['month'],
                                  "monthName": this.monthName[this.allocation[numOfDay][index2][0]['month']-1],
                                  "producer" :this.allocation[numOfDay][index2][0]['producers'],
                                  "barnameId" :this.allocation[numOfDay][index2][0]['id'],
                                  "networkName" :this.allocation[numOfDay][index2][0]['network'],
                                  "networkId" :this.allocation[numOfDay][index2][0]['networkId'],
                                  // "RegDate" : this.allocation[3][index2][0]['registerDate']
                                  "duration" :  moment.from(this.allocation[numOfDay][index2][0]['registerDate'], 'en', 'YYYY-MM-DD').toNow(true),
                                  "RegDate" :  moment.from(this.allocation[numOfDay][index2][0]['registerDate'], 'en', 'YYYY-MM-DD').format('YYYY/MM/DD'),
                                  "totalDay":0,
                                  "totalConflict":0
                                }
                   
                              this.RowsData.push(this.test);
                              this.RowsDataForWhichDay.push(test4);
                            console.log("80003",index2)
                            console.log("70003",this.allocation[numOfDay])

                            
                              this.RowsExtraDataset.push(test3);
                        
                      
                            
                            
                    }
                    
                
                    for (let index = -1; index <this.allocation[numOfDay].length; index++) { 
                    
                        moment.locale('fa');
                        
                      let index2 =(index == -1 ? 0 : index);
              
                      this.test2 =   
                                {  
                                  "hour" : index
                                }
    
                   
                        
                              this.IsCellClick.push(this.test2);
                            
                            
                      }
                    
                      this.test =   
                      {  
                        "hour" :""
                      }
                      let test2={
                        "hour" :""
                      }
                      let test3={
                        "hour" : ""
                      }
                      this.totalOfColumn.push(this.test);
                      this.remainResourceOfColumn.push(test2);
                      this.shortageResourceOfColumn.push(test3);

                      for (let i = 1; i <= 24;i++){
                  
                        this.totalOfColumn[numOfDay][i]= 0;
                        this.shortageResourceOfColumn[numOfDay][i]= 0;
                        this.remainResourceOfColumn[numOfDay][i]= this.resourceInfo[0]['resourceCapacity'];
                      }
                      this.remainResourceOfColumn[numOfDay]['hour'] = "منبع آزاد"
                      this.totalOfColumn[numOfDay]['hour'] = "مجموع"
                      this.shortageResourceOfColumn[numOfDay]['hour'] = "کمبود؟"
                    
                      for (let index = 1; index < this.RowsData.length; index++) { 
                        
                              for(let j = 0 ; j < this.allocation[numOfDay][index-1].length; j++){
                                
                                (this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']]) =0 ;
                              
                              }
                              
                              for(let j = 0 ; j < (this.allocation[numOfDay][index-1].length); j++){
                              
                                    
                    
                                (this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']]) += (this.allocation[numOfDay][index-1][j]['usedUnit']) ;
                                (this.RowsDataForWhichDay[index][this.allocation[numOfDay][index-1][j]['hour']]) = ((this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']])>0)?1:0 ;
                                this.totalOfColumn[numOfDay][this.allocation[numOfDay][index-1][j]['hour']] += this.allocation[numOfDay][index-1][j]['usedUnit'];
                          
                                delete this.RowsDataForWhichDay[index].hour;
                              }
                            
                            
                      }

                      this.ArrayRowsDataset.push(this.RowsData)
                      this.ArrayRowsDatasetForWhichDay.push(this.RowsDataForWhichDay)
                      this.ArrayRowsExtraDataset.push(this.RowsExtraDataset)
                

                      this.resourceService.getFreeResourcePerHour(resourceId,year,month,this.allocation[numOfDay][0][0].day).subscribe((allocation: Allocation[]) => {
                    
                        let allocation2 = allocation['allocations'];
                        this.resourceInfo = allocation['test'];
                    
                        for(let numOfHour=0; numOfHour<this.allocation.length;numOfHour++){
                          for (let index = 0; index <allocation2.length; index++) { 
                          
                            this.remainResourceOfColumn[numOfDay][allocation2[index]['hour']] -= allocation2[index]['usedResource']
                                
                        }

                        for(let index = 0; index <24; index++){
                  
                            let dif = this.remainResourceOfColumn[numOfDay][index]-this.totalOfColumn[numOfDay][index];
                            this.shortageResourceOfColumn[numOfDay][index] =  (dif<0) ? 1 : 0;
                        
                    
                        }          
                      }

   console.log("70001",  this.ArrayRowsExtraDataset);
 
                      for(let i=0; i<this.ArrayRowsDatasetForWhichDay[numOfDay].length;i++) {
                      for(let i2 in this.ArrayRowsDatasetForWhichDay[numOfDay][i]) {
                    
                        this.ArrayRowsExtraDataset[numOfDay][i].totalDay += 1
                                            if(this.shortageResourceOfColumn[numOfDay][i2]==1){
                                              this.ArrayRowsExtraDataset[numOfDay][i].totalConflict += 1
                                            }
                        }
                      }

    
    
            //this.RowsData.shift()

          }, () => {
           alert('This is from orgField');
          }
          );
          }
  
          //this.RowsData.shift()

        }, () => {
          alert('This is from orgField');
        }
        );

  }

  acceptRequest(resourceId: string, year:  number, month:  number, day: number, barnameId: string) {


        this.resourceService.acceptRequest(resourceId,year,month, day, barnameId).subscribe((allocation: Allocation[]) => {
           
          this.gettingWaitingForAcceptAllocation(resourceId,year, month);
          this.gettingRejectedAllocation(resourceId,year, month);

        }, () => {
         alert('This is from orgField');
        }
        );

  }

  rejectRequest(resourceId: string, year:  number, month:  number, day: number, barnameId: string) {


        this.resourceService.rejectRequest(resourceId,year,month, day, barnameId).subscribe((allocation: Allocation[]) => {
          
        this.gettingWaitingForAcceptAllocation(resourceId,year, month);
        this.gettingRejectedAllocation(resourceId,year, month);

        }, () => {
         alert('This is from orgField');
        }
        );

  }


  gettingWaitingAllocation(resourceId: string, year:  number, month: number) {
    
    var numberOfDays: number[] = [31,62,93,124,155,186,216,246,276,306,336,365];
      this.RowsData = [ ]  
      this.IsCellClick = [ ]  
      
          this.header=["hour"]
          
          
          for (let i = 1; i <= 24;i++){
            this.header.push(i)
          }
          this.resourceService.getAcceptedAllocations(resourceId,year).subscribe((allocation: Allocation[]) => {
          //this.resourceService.getAllocations(1,1400,m).subscribe((allocation: Allocation[]) => {


        
          this.allocation = allocation['allocations'];
          this.resourceInfo = allocation['test'];
          for (let index = -1; index <365; index++) { 
            var index33=numberOfDays.findIndex(function(number) {
              return number > index;
            });
          this.test =   
                    {  
                      "hour" :1+(index33 <= 0 ? index : index-numberOfDays[index33-1] )+"  "+ this.monthName[index33]
                    }
                  
          this.test2 =   
                    {  
                      "hour" : index
                    }
                  
                  this.RowsData.push(this.test);
                  this.IsCellClick.push(this.test2);
                
                  
                
          }

          for (let index = 0; index <= 365; index++) { 
        
            for (let index2 = 1; index2 <= 24; index2++) {
                this.RowsData[index][index2] = this.resourceInfo[0]['resourceCapacity'];
                this.IsCellClick [index][index2] = false;
            }
        
                
          }
          

          
          for (let index = 0; index < this.allocation.length; index++) {
            var daysPassedInLastMonths = this.allocation[index].month == 0 ? 0 : numberOfDays[this.allocation[index].month-2];
            var dayIndexOfYear = this.allocation[index].day + daysPassedInLastMonths;

            this.RowsData[dayIndexOfYear][this.allocation[index].hour]-=this.allocation[index].usedUnit;
            // this.IsCellClick[this.allocation[index].hour][this.allocation[index].day]=false;
      

          }
          //this.RowsData.shift()

        }, () => {
         alert('This is from orgField');
        }
        );
      

      
  


  }

  onChangeRequestRes(requestResValue: number) {
    this.requestVolume = requestResValue;
    this.gettingWaitingForAcceptAllocation(this.resourceId,this.year, this.month);
    this.gettingRejectedAllocation(this.resourceId,this.year, this.month);


  }

  onChangeResource(deviceValue: string) {
  
    this.resourceId = deviceValue;
    this.gettingWaitingForAcceptAllocation(this.resourceId,this.year, this.month);
    this.gettingRejectedAllocation(this.resourceId,this.year, this.month);

    this.gettingDataCapacity( this.resourceId);
  }
  
onChangeYear(value: number) {
  
    let todayJalali = moment().locale('fa').format('YYYY');
    this.year = value;
    this.gettingWaitingForAcceptAllocation(this.resourceId,this.year, this.month);
    this.gettingRejectedAllocation(this.resourceId,this.year, this.month);

}
  

onChangeMonth(valueMonth: number) {

    this.month = valueMonth;
    this.gettingWaitingForAcceptAllocation(this.resourceId,this.year, this.month);
    this.gettingRejectedAllocation(this.resourceId,this.year, this.month);
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

onCellClick(rowIndex: number,columnIndex:  number){

  if(this.clickDown){
      if(this.requestVolume <= this.RowsData[rowIndex][columnIndex])
      {
        this.IsCellClick[rowIndex][columnIndex] = (this.IsCellClick[rowIndex][columnIndex]) ? false : true;
        
      }
      const listOfObjecs = [
        { id: 1,  score: 11 },

      ];
      listOfObjecs.push( { id: rowIndex,  score: columnIndex })

      
  }


}
onCellClickSingleClick(rowIndex:  number,columnIndex: number,event: { which: number; }){

  if(event.which==1){
      if(this.requestVolume <= this.RowsData[rowIndex][columnIndex])
      {
        this.IsCellClick[rowIndex][columnIndex] = (this.IsCellClick[rowIndex][columnIndex]) ? false : true;
        
      }
      const listOfObjecs = [
        { id: 1,  score: 11 },

      ];
      listOfObjecs.push( { id: rowIndex,  score: columnIndex })

      

    }

}

onSave(){
  
  this.allocationRegister = [];
  for( let dayIndex = 0; dayIndex <= 365; dayIndex++){
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
      }
    }
  }
}


register(){
this.allocationRegister
this.resourceService.registerAllocation(this.allocationRegister).subscribe(() => {

alert('ثبت نام با موفقیت انجام شد.');

this.gettingWaitingForAcceptAllocation(
  this.allocationRegister[0].resourceId,
  this.allocationRegister[0].year,
  this.allocationRegister[0].month);

  this.gettingRejectedAllocation(
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

gettingRejectedAllocation(resourceId: string, year: number, month: number) {



  this.colors = [  '#ee4035', ' #f37736', '#fdf498', '#7bc043',' #0392cf', 'rgb(136,212,194) ', '	#ff6e4a', '#c3e3f5 ', '#76b3e8',  '#ee4035', ' #f37736', '#fdf498', '#7bc043',' #0392cf', 'rgb(136,212,194) ', '	#ff6e4a', '#c3e3f5 ', '#76b3e8' ];
  this.colors2 = [  '#2a4d69' , '#4b86b4' , '#adcbe3' , '#e7eff6' , '#63ace5','#e3c9c9' , '#f4e7e7' , '#eedbdb' , '#cecbcb' , '#cbdadb' ];
  this.random  = Math.floor((Math.random() * 9) + 1);
  this.color   = Math.floor((Math.random() * this.colors.length - 1) + 1);
  
  this.totalOfColumn = []  
  this.IsCellClick = [ ]  
  this.header=["hour"]
  this.header2=["نام برنامه","شبکه","تهیه کننده", "تاریخ ثبت","زمان سپری شده","درصد تداخل"]

  this.RejectedArrayRowsDataset = []
  this.RejectedArrayRowsDatasetForWhichDay = []
  this.RejectedArrayRowsExtraDataset = []
  
  for (let i = 1; i <= 24;i++){
    this.header.push(i)

  }

  for(let m = 0; m < 12; m++){

    if(m<6){
      this.numberDayOfMonth[m]= Array.from({length: 31}, (_, i) => i + 1)
    }
    else if(m <11){
      this.numberDayOfMonth[m]= Array.from({length: 30}, (_, i) => i + 1)
    }
    else{
      this.numberDayOfMonth[m]= Array.from({length: 29}, (_, i) => i + 1)
    }

    

  }
  console.log("30001",this.numberDayOfMonth)

  this.resourceService.getAllRejectedRequest(resourceId,year,month).subscribe((allocation: Allocation[]) => {
      
    this.allocation = allocation['allocations'];
    this.resourceInfo = allocation['test'];
    
    for(let numOfDay=0; numOfDay<this.allocation.length;numOfDay++){

  this.RowsData = [ ]
  this.RowsDataForWhichDay = [ ]
  this.RowsExtraDataset = [ ]


  for (let index = -1; index <this.allocation[numOfDay].length; index++) { 
   
      moment.locale('fa');
      
    let index2 =(index == -1 ? 0 : index);
    this.test =   
              {  
                "hour" :this.allocation[numOfDay][index2][0]['title']
              }
    let test4 =   
              {  
                "hour" :(this.allocation[numOfDay][index2][0]['title']>0)?1:0
              }
    let test3 =   
              {  
                "hour" :this.allocation[numOfDay][index2][0]['title'],
                "day": this.allocation[numOfDay][index2][0]['day'],
                "year": this.allocation[numOfDay][index2][0]['year'],
                "month": this.allocation[numOfDay][index2][0]['month'],
                "monthName": this.monthName[this.allocation[numOfDay][index2][0]['month']-1],
                "producer" :this.allocation[numOfDay][index2][0]['producers'],
                "barnameId" :this.allocation[numOfDay][index2][0]['id'],
                "networkName" :this.allocation[numOfDay][index2][0]['network'],
                "networkId" :this.allocation[numOfDay][index2][0]['networkId'],
                // "RegDate" : this.allocation[3][index2][0]['registerDate']
                "duration" :  moment.from(this.allocation[numOfDay][index2][0]['registerDate'], 'en', 'YYYY-MM-DD').toNow(true),
                "RegDate" :  moment.from(this.allocation[numOfDay][index2][0]['registerDate'], 'en', 'YYYY-MM-DD').format('YYYY/MM/DD'),
                "totalDay":0,
                "totalConflict":0
              }
    this.test2 =   
              {  
                "hour" : index
              }
            this.RowsData.push(this.test);
            this.RowsDataForWhichDay.push(test4);
          

          
            this.RowsExtraDataset.push(test3);
       
            this.IsCellClick.push(this.test2);
          
           
    }
   
    this.test =   
    {  
      "hour" :""
    }
    let test2={
      "hour" :""
    }
     let test3={
       "hour" : ""
     }
    this.totalOfColumn.push(this.test);
    this.remainResourceOfColumn.push(test2);
    this.shortageResourceOfColumn.push(test3);

    for (let i = 1; i <= 24;i++){

      this.totalOfColumn[numOfDay][i]= 0;
      this.shortageResourceOfColumn[numOfDay][i]= 0;
      this.remainResourceOfColumn[numOfDay][i]= this.resourceInfo[0]['resourceCapacity'];
    }
    this.remainResourceOfColumn[numOfDay]['hour'] = "منبع آزاد"
    this.totalOfColumn[numOfDay]['hour'] = "مجموع"
    this.shortageResourceOfColumn[numOfDay]['hour'] = "کمبود؟"
   
    for (let index = 1; index < this.RowsData.length; index++) { 
      
            for(let j = 0 ; j < this.allocation[numOfDay][index-1].length; j++){
              
              (this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']]) =0 ;
             
            }
            
            for(let j = 0 ; j < (this.allocation[numOfDay][index-1].length); j++){
             
                  
   
              (this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']]) += (this.allocation[numOfDay][index-1][j]['usedUnit']) ;
              (this.RowsDataForWhichDay[index][this.allocation[numOfDay][index-1][j]['hour']]) = ((this.RowsData[index][this.allocation[numOfDay][index-1][j]['hour']])>0)?1:0 ;
              this.totalOfColumn[numOfDay][this.allocation[numOfDay][index-1][j]['hour']] += this.allocation[numOfDay][index-1][j]['usedUnit'];
         
              delete this.RowsDataForWhichDay[index].hour;
            }
          
           
    }

    this.RejectedArrayRowsDataset.push(this.RowsData)
    this.RejectedArrayRowsDatasetForWhichDay.push(this.RowsDataForWhichDay)
    this.RejectedArrayRowsExtraDataset.push(this.RowsExtraDataset)

    this.resourceService.getFreeResourcePerHour(resourceId,year,month,this.allocation[numOfDay][0][0].day).subscribe((allocation: Allocation[]) => {
   
      let allocation2 = allocation['allocations'];
      this.resourceInfo = allocation['test'];
  
      for(let numOfHour=0; numOfHour<this.allocation.length;numOfHour++){
        for (let index = 0; index <allocation2.length; index++) { 
        
          this.remainResourceOfColumn[numOfDay][allocation2[index]['hour']] -= allocation2[index]['usedResource']
              
      }

      for(let index = 0; index <24; index++){
 
          let dif = this.remainResourceOfColumn[numOfDay][index]-this.totalOfColumn[numOfDay][index];
          this.shortageResourceOfColumn[numOfDay][index] =  (dif<0) ? 1 : 0;
       
  
      }          
    }



for(let i=0; i<this.RejectedArrayRowsDatasetForWhichDay[numOfDay].length;i++) {
for(let i2 in this.RejectedArrayRowsDatasetForWhichDay[numOfDay][i]) {

this.RejectedArrayRowsExtraDataset[numOfDay][i].totalDay += 1
                if(this.shortageResourceOfColumn[numOfDay][i2]==1){
                  this.RejectedArrayRowsExtraDataset[numOfDay][i].totalConflict += 1
                }
}
}



      //this.RowsData.shift()

    }, () => {
     alert('This is from orgField');
    }
    );
    }

    //this.RowsData.shift()

  }, () => {
    alert('This is from orgField');
  }
  );

}



  ngOnInit() {
    for(let i=0;i<=31;i++){
this.div[i]=false;
    }

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

    this.gettingWaitingForAcceptAllocation(this.resourceId,this.year, this.month);
    this.gettingRejectedAllocation(this.resourceId,this.year, this.month);
  
    // this.gettingDataCapacity(4);
    this.gettingResources();
    this.gettingDataResource();
    this.gettingDataYearMonth();
    this.screenplayRegForm.patchValue({
      orgStructure: []
    });


  
  }

}
