      import { Component, OnInit, Output, EventEmitter, Input, Renderer2, ViewChild } from '@angular/core';
      import { Query } from '@syncfusion/ej2-data';
      import { FilteringEventArgs, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
      import { EmitType } from '@syncfusion/ej2-base';
      import { User } from '../_models/user';
      import { ResourceService } from '../_services/resource.service';
      import { FormGroup, FormControl } from '@angular/forms';
      import { Resource } from '../_models/resource';
      import { Allocation } from '../_models/allocation';
      import * as moment from 'jalali-moment';
import { AllocationRegister } from '../_models/allocationRegister';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';

      declare var $: any;
      
      @Component({
        selector: 'app-resource-reg',
        templateUrl: './resource-reg.component.html',
        styleUrls: ['./resource-reg.component.css'],
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
      export class ResourceRegComponent implements OnInit {

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

        selectedOption: string;
        selectedCapacity: number;
   
        constructor(
          public renderer: Renderer2,
          private resourceService: ResourceService,
          
          ) { }

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
          console.log("mouse:   "+this.clickDown +" from down  " + event.which)
        }
        mouseClickUp(event: { which: number; }){
          if(event.which == 1){
            this.clickDown = false;
            
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

        gettingAllocation(resourceId: string, year: number, month: number) {
          var monthNumber = month < 7 ? 31 : (month < 12 ? 30:29);
          this.totalDay = monthNumber;

          this.resourceService.getAllocations(resourceId,year,month).subscribe((allocation: Allocation[]) => {
            this.header=["hour","activity"]
          
            for (let i = 1; i <= 24;i++){
              this.header.push(i)
            }
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
                  "hour" : moment(myDate,"jYYYYjMMjDD",'fa').format('ddd, ll'),
                  "activity":""
        
                }
              
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
              }
          
                   
            }
            for (let index = 0; index < this.allocation.length; index++) {

              this.RowsData[this.allocation[index].day][this.allocation[index].hour]-=this.allocation[index].usedUnit;
              // this.IsCellClick[this.allocation[index].hour][this.allocation[index].day]=false;

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
            console.log("2003",myDate)
            console.log("2004",moment(myDate,"jYYYYjMMjDD",'fa').format('ddd, ll'))
            console.log('2005',moment(myDate,"jYYYYjMMjDD",'fa').format('d'))

   
            console.log("2003",this.year,this.month, index)
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
      
        ngOnInit() {

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

      }
