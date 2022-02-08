import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Request } from '../_models/request';
import { Person } from '../_models/person';
import { BasicData } from '../_models/basicData';
import { Episode } from '../_models/episode';
import { ScreenplayFormat } from '../_models/screenplayFormat';
import { ScreenplayStatus } from '../_models/screenplayStatus';
import { OrgStructure } from '../_models/orgStructure';

const httpOptions = {
  headers: new HttpHeaders({
   
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })

};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private httpClient: HttpClient
    ) { }
  getRequests(): Observable<Request[]> {
     return this.http.get<Request[]>(this.baseUrl + 'rrequest/getAllRRequests', httpOptions);
   }
  getRequestsByGroup(groupId: any): Observable<Request[]> {
     return this.http.get<Request[]>(this.baseUrl + 'rrequest/getAllRRequestsByGroup/'+groupId, httpOptions);
   }
  getBarnameByGroup(groupId: any): Observable<Request[]> {
    
     return this.http.get<Request[]>(this.baseUrl + 'barname/getAllBarnamesByGroup/'+groupId, httpOptions);
   }
  getBarnameInfoById(id: any): Observable<Request[]> {
    
     return this.http.get<Request[]>(this.baseUrl + 'barname/getBarnameById/'+id, httpOptions);
   }
   
}
