import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componenets/layouts/header/header.component';
import { SidenavComponent } from './componenets/layouts/sidenav/sidenav.component';

import { FooterComponent } from './componenets/layouts/footer/footer.component';
import { DashboardComponent } from './componenets/reports/dashbaord_reports/dashboard/dashboard.component';
import { StylesDetialsComponent } from './componenets/reports/styles-detials/styles-detials.component';
import { AccountingComponent } from './componenets/reports/accouting_folder/accounting/accounting.component';
import { ProfitlossComponent } from './componenets/reports/accouting_folder/profitloss/profitloss.component';
import { BalancesheetComponent } from './componenets/reports/accouting_folder/balancesheet/balancesheet.component';
import { StatementOfCashFlowsComponent } from './componenets/reports/accouting_folder/statement-of-cash-flows/statement-of-cash-flows.component';
import { AdvertisingReportsComponent } from './componenets/reports/Advertising_Reports_Folder/advertising-reports/advertising-reports.component';
import { CampaignReportComponent } from './componenets/reports/Advertising_Reports_Folder/campaign-report/campaign-report.component';
import { AdgroupReportComponent } from './componenets/reports/Advertising_Reports_Folder/adgroup-report/adgroup-report.component';
import { ProductReportComponent } from './componenets/reports/Advertising_Reports_Folder/product-report/product-report.component';
import { InventoryReportsComponent } from './componenets/reports/Inventory_Reports_Folder/inventory-reports/inventory-reports.component';
import { AvailableInventoryComponent } from './componenets/reports/Inventory_Reports_Folder/available-inventory/available-inventory.component';
import { AgedInventoryComponent } from './componenets/reports/Inventory_Reports_Folder/aged-inventory/aged-inventory.component';
import { InventoryCostingComponent } from './componenets/reports/Inventory_Reports_Folder/inventory-costing/inventory-costing.component';
import { ProductBalanceLedgerComponent } from './componenets/reports/Inventory_Reports_Folder/product-balance-ledger/product-balance-ledger.component';
import { PreformanceReportComponent } from './componenets/reports/Performance_Reports_folder/performance-report/performance-report.component';
import { AllordersComponent } from './componenets/reports/Performance_Reports_folder/allorders/allorders.component';
import { ProductPreformanceComponent } from './componenets/reports/Performance_Reports_folder/product-performance/product-preformance.component';
import { ProductProfitabilityComponent } from './componenets/reports/Performance_Reports_folder/product-profitability/product-profitability.component';
import { PaymentReportsComponent } from './componenets/reports/payments_reports_folder/payment-reports/payment-reports.component';
import { SettlementsReportComponent } from './componenets/reports/payments_reports_folder/settlements-report/settlements-report.component';
import { ReplenishmentReportComponent } from './componenets/reports/Replenishment_Reports_folder/replenishment-report/replenishment-report.component';
import { StandardForcastComponent } from './componenets/reports/Replenishment_Reports_folder/standard-forcast/standard-forcast.component';
import { SeasonalForcastComponent } from './componenets/reports/Replenishment_Reports_folder/seasonal-forcast/seasonal-forcast.component';
import { FactoryForcastComponent } from './componenets/reports/Replenishment_Reports_folder/factory-forcast/factory-forcast.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import 'ag-grid-enterprise';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormControl } from '@angular/forms';
import { SearhmenuComponent } from './componenets/layouts/searchmenu/searhmenu.component';
import { CommonModule } from "@angular/common";


import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from 'src/app/credentialing/login/login.component';
import { UserService } from 'src/services&Validtors/user.service';
import { AuthService } from 'src/services&Validtors/auth.service';

import { RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/authguard.service';


import { TokenInterceptor } from 'src/services&Validtors/token.interceptor.service';

import { BnNgIdleService } from 'bn-ng-idle';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

import { UserIdleModule } from 'angular-user-idle';
import { StoreModule } from '@ngrx/store';
import { Idle } from 'idlejs/dist';
import { CompanysignupComponent } from 'src/app/credentialing/companysignup/companysignup.component';
import { SignupComponent } from 'src/app/credentialing/signup/signup.component';

import { UniqueUsernameValidtorDirective } from 'src/services&Validtors/unique-username-validtor.directive';
import { UsernameValidator } from '../services&Validtors/username';
import { LoadingpageComponent } from './credentialing/loadingpage/loadingpage.component';
import { OnboardingComponent } from './credentialing/onboarding/onboarding.component';
import { CompanyValidator } from 'src/services&Validtors/company';
import { AuthTokenValidator } from 'src/services&Validtors/authtoken';
import { MerchantValidator } from 'src/services&Validtors/merchant';
import { LandingpageComponent } from './credentialing/landingpage/landingpage.component';
import { PricingpageComponent } from './credentialing/pricingpage/pricingpage.component';


import { PasswordresetpageComponent } from './settingsmenu/accountinfo/passwordresetpage.component';

import { UsersettingspageComponent } from './settingsmenu/usersettingspage/usersettingspage.component'
import { Sidenav4settingsComponent } from './settingsmenu/sidenav4settings/sidenav4settings.component';
import { SettingsheaderComponent } from './settingsmenu/settingsheader/settingsheader.component';
import { UserpermissionsComponent } from './settingsmenu/userpermissions/userpermissions.component';
import { ManageaccountComponent } from './settingsmenu/manageaccount/manageaccount.component';
import { BillinginformationComponent } from './settingsmenu/billinginformation/billinginformation.component';
import { PaymenthistoryComponent } from './settingsmenu/paymenthistory/paymenthistory.component';
import { PreferencesComponent } from './settingsmenu/preferences/preferences.component';
import { EmailinputComponent } from './credentialing/forgotpasswordmod/emailinput/emailinput.component';
import { ResetpasswordComponent } from './credentialing/forgotpasswordmod/resetpassword/resetpassword.component'
import { EmailValidator } from 'src/services&Validtors/uniqueemail'
import { PersonalValidator } from 'src/services&Validtors/username&email';
import { PopupModule } from 'ng2-opd-popup'
import { Advertising_Token_Validator } from 'src/services&Validtors/Advertising_Token_Validator'
import { CompanyValidator4Settings } from 'src/services&Validtors/company4settings'
import { AuthTokenValidator4Settings } from 'src/services&Validtors/mws_authtoken_4_settings'
import { MerchantValidator4Settings } from 'src/services&Validtors/merchant_4_settings'
import { Advertising_Token_Validator_4_Settings } from 'src/services&Validtors/Advertising_Token_Validator_4_serrings';
import { CreateUserFromEmailComponent } from './credentialing/create-user-from-email/create-user-from-email.component';
import { AddCreatedUserToCompanyComponent } from './credentialing/add-created-user-to-company/add-created-user-to-company.component';
import { Page404Component } from './credentialing/page404/page404.component';
import { WariningpageComponent } from './credentialing/wariningpage/wariningpage.component'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DatePickerComponent } from './ag-grid-custom-cell-styles/date-picker/date-picker.component';
import { DropzoneComponent } from './componenets/layouts/dropzone/dropzone.component';
import { DndDirective } from './componenets/layouts/dnd.directive';
import { ProgressComponent } from './componenets/layouts/progress/progress.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonsComponent } from './componenets/layouts/buttons/buttons.component';
import { EventEmitter } from 'protractor';
import { EventEmitterService } from 'src/event-emitter.service';
import { ReportBuilderComponent } from './componenets/reports/report-builder/report-builder.component';
import { NgxWidgetGridModule } from 'ngx-widget-grid';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    AllordersComponent,
    FooterComponent,
    DashboardComponent,
    StylesDetialsComponent,
    AccountingComponent,
    ProfitlossComponent,
    BalancesheetComponent,
    StatementOfCashFlowsComponent,
    AdvertisingReportsComponent,
    CampaignReportComponent,
    AdgroupReportComponent,
    ProductReportComponent,
    InventoryReportsComponent,
    AvailableInventoryComponent,
    AgedInventoryComponent,
    InventoryCostingComponent,
    ProductBalanceLedgerComponent,
    PreformanceReportComponent,
    ProductPreformanceComponent,
    ProductProfitabilityComponent,
    PaymentReportsComponent,
    SettlementsReportComponent,
    ReplenishmentReportComponent,
    StandardForcastComponent,
    SeasonalForcastComponent,
    FactoryForcastComponent,
    SearhmenuComponent,
    LoginComponent,
    CompanysignupComponent,
    SignupComponent,

    UniqueUsernameValidtorDirective,
    LoadingpageComponent,
    OnboardingComponent,
    LandingpageComponent,
    PricingpageComponent,

    PasswordresetpageComponent,
    UsersettingspageComponent,
    Sidenav4settingsComponent,
    SettingsheaderComponent,
    UserpermissionsComponent,
    ManageaccountComponent,
    BillinginformationComponent,
    PaymenthistoryComponent,
    PreferencesComponent,
    EmailinputComponent,
    ResetpasswordComponent,
    CreateUserFromEmailComponent,
    AddCreatedUserToCompanyComponent,
    Page404Component,
    WariningpageComponent,
    DatePickerComponent,
    DropzoneComponent,
    DndDirective,
    ProgressComponent,
    ButtonsComponent,
    ReportBuilderComponent,



  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, [
      A11yModule,
      ClipboardModule,
      CdkStepperModule,
      CdkTableModule,
      CdkTreeModule,
      DragDropModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,

      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      PortalModule,
      ScrollingModule,
    ],
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    FileUploadModule,
    NgxWidgetGridModule,

  ],
  providers: [EventEmitterService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe, Title, UserService, MerchantValidator4Settings, Advertising_Token_Validator_4_Settings, AuthService, AuthTokenValidator4Settings, CompanyValidator, CompanyValidator4Settings, AuthTokenValidator, MerchantValidator, Advertising_Token_Validator, UsernameValidator, EmailValidator, PersonalValidator, BnNgIdleService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
