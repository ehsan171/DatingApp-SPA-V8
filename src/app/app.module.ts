import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinalRegistrationTwoComponent } from './final-registration-two/final-registration-two.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RRequestAllComponent } from './r-request-all/r-request-all.component';
import { RRequestComponent } from './r-request/r-request.component';
import { RegisterComponent } from './register/register.component';
import { RequestRegComponent } from './request-reg/request-reg.component';
import { ResourceRegComponent } from './resource-reg/resource-reg.component';
// import { appRoutes } from './routes';
import { ScreenplayDetailComponent } from './screenplay-detail/screenplay-detail.component';
import { ScreenplayComponent } from './screenplay/screenplay.component';
import { AuthService } from './_services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NavComponent } from './nav/nav.component';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AutoCompleteModule,  DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { BarnameInfoComponent } from './barname-info/barname-info.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LogOutComponent } from './log-out/log-out.component';
import { TestComponent } from './test/test.component';
import { AgGridModule } from 'ag-grid-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Test2Component } from './test2/test2.component';
import { MatTableModule } from '@angular/material/table';
// import { MatTableDataSource } from '@angular/material/table';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesComponent,
    RegisterComponent,
    ScreenplayComponent,
    ScreenplayDetailComponent,
    ResourceRegComponent,
    RRequestComponent,
    RRequestAllComponent,
    RequestRegComponent,
    FinalRegistrationTwoComponent,
    ListsComponent,
    NavComponent,
    BarnameInfoComponent,
    FooterComponent,
    LoginComponent,
    ConfirmDialogComponent,
    LogOutComponent,
    TestComponent,
    Test2Component,
    
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CheckBoxModule, 
    ButtonModule ,
    MatTableModule,
    DropDownListModule,
    MatPaginatorModule ,
    NgbModule,
    MatTabsModule,
    MatFormFieldModule,
    AutoCompleteModule,
    NumericTextBoxModule,
    MultiSelectModule,
    NumericTextBoxModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    NgxSpinnerModule,
    AgGridModule.withComponents([]),
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    // MatTableDataSource,
    FormsModule ,
    MultiSelectModule ,
    MatTableModule 
  

  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true}
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
