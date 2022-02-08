import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Request } from '../_models/request';
import { RequestService } from '../_services/request.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ViewEncapsulation } from '@angular/core';

/**
 * @title Table with pagination
 */



const ELEMENT_DATA2: PeriodicElement2[] = [
  {row: 1, id: 1, title: '', group: [], genre: '', baravordNo: '', producer: '', rRequestTitle: '', regDate: ''},
];
export interface PeriodicElement2 {

  row: number;
  id: number;
  title: string;
  baravordNo: string;
  rRequestTitle: any;
  producer: any;
  group: string[];
  genre: string;
  regDate: any;
}
@Component({
  selector: 'app-r-request-all',
  templateUrl: './r-request-all.component.html',
  styleUrls: ['./r-request-all.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RRequestAllComponent implements OnInit {
  dataSource2: MatTableDataSource<PeriodicElement2>;

  displayedColumns: string[] = ['row', 'id', 'title', 'baravordNo', 'rRequestTitle', 'producer', 'group', 'genre', 'regDate'];

  public dataRequest2: PeriodicElement2[] = [];
  requests2: any[];
  dummy: any[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

   onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
}
  gettingDataTitle(){
    this.requestService.getRequests().subscribe((requests: Request[]) => {
      this.requests2 = requests;
      for (let index = 0; index < requests.length; index++) {
        this.dataRequest2.push( {row: 0, id: 0, title: '', baravordNo: '', rRequestTitle: '', producer: '', group: [], genre: '', regDate: '' });
        this.dataRequest2[index].row = index + 1;
        this.dataRequest2[index].id = requests[index].id;
        this.dataRequest2[index].title = requests[index].barnameTitle;
        this.dataRequest2[index].baravordNo = requests[index].baravordNo;
        this.dataRequest2[index].rRequestTitle = requests[index].rRequestTitle;
        // const merged = [].concat.apply([], this.dataScreenplay2[index].writer);
        // this.dataScreenplay2[index].writer = merged.filter( this.onlyUnique );
        this.dataRequest2[index].producer = requests[index].producers;
        this.dataRequest2[index].group = requests[index].group;
        this.dataRequest2[index].regDate = requests[index].regDate;

      }
      this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.dataRequest2);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;


    }, error => {
      alert('خطا در ارسال داده');
    }
    );

  }

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }



  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient,
    public router: Router,

  ) {  }

  getRecord(id: { id: string; }){
      window.location.href = 'screenplay/' + id.id;

  }
  ngOnInit() {
    this.gettingDataTitle();

  }
}

