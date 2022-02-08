import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Screenplay } from '../_models/screenplay';
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
export class ScreenplayService {
  // baseUrl = environment.apiUrl;
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private httpClient: HttpClient
  ) { }

  getScreenplays(): Observable<Screenplay[]> {
    console.log(this.baseUrl + 'screenplay/test');


    return this.http.get<Screenplay[]>(this.baseUrl + 'screenplay/test', httpOptions);
  }
  getScreenplay(id: string | number): Observable<Screenplay[]> {

    return this.http.get<Screenplay[]>(this.baseUrl + 'screenplay/' + id, httpOptions);
  }

  getAllScreenplays(): Observable<Screenplay[]> {
    console.log(this.baseUrl + 'screenplay/getAllScreenplays')
    return this.http.get<Screenplay[]>(this.baseUrl + 'screenplay/getAllScreenplays', httpOptions);

  }

  getEpisode(screenplayId: string): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.baseUrl + 'screenplay/episode/' + screenplayId, httpOptions);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl + 'Person', httpOptions);
  }
  getFormats(): Observable<BasicData[]> {
    return this.http.get<BasicData[]>(this.baseUrl + 'Basicdata/formats', httpOptions);
  }
  getGroups(parentId: any): Observable<BasicData[]> {
  
    console.log(this.baseUrl + 'Basicdata/groups/'+parentId)
    return this.http.get<BasicData[]>(this.baseUrl + 'Basicdata/groups/'+parentId, httpOptions);
  }
  getConcepts(): Observable<BasicData[]> {
    console.log(this.baseUrl + 'Basicdata/concepts');
    return this.http.get<BasicData[]>(this.baseUrl + 'Basicdata/concepts', httpOptions);
  }
  getOrgs(): Observable<OrgStructure[]> {
    console.log(this.baseUrl + 'Basicdata/orgs');
    return this.http.get<OrgStructure[]>(this.baseUrl + 'Basicdata/orgs', httpOptions);


  }
  getFormatNumbers(): Observable<ScreenplayFormat[]> {
    return this.http.get<ScreenplayFormat[]>(this.baseUrl + 'screenplay/formatReport', httpOptions);
  }
  getStatusNumbers(): Observable<ScreenplayStatus[]> {
    return this.http.get<ScreenplayStatus[]>(this.baseUrl + 'screenplay/statusReport', httpOptions);
  }
  getStatuses(): Observable<BasicData[]> {
    return this.http.get<BasicData[]>(this.baseUrl + 'Basicdata/statuses', httpOptions);
  }
  getGenres(): Observable<BasicData[]> {
    return this.http.get<BasicData[]>(this.baseUrl + 'Basicdata/genres', httpOptions);
  }

  register(model: any) {
    console.log("nnnnnnnnnnnnnnnnnnn");
    console.log(model)
    return this.http.post(this.baseUrl + 'screenplay/register', model);
  }

  screenplayUpdate(model: any) {

    console.log('service model ', model)
    return this.http.post(this.baseUrl + 'screenplay/update', model);
  }

  episodeRegister(model: any, screenplayId: string) {
    return this.http.post(this.baseUrl + 'screenplay/' + screenplayId + '/Episode/register', model);
  }

  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'GET',
      `${'http://localhost:5000/api/episode/upload/download2'}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }



}
