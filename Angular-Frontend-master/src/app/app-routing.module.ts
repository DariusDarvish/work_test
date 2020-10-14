import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

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
import { LoginComponent } from 'src/app/credentialing/login/login.component';
import { CompGuard } from 'src/app/guards/compguards.service';
import { RegisterService } from 'src/app/guards/register.service';
import { CompanysignupComponent } from 'src/app/credentialing/companysignup/companysignup.component'
import { SignupComponent } from 'src/app/credentialing/signup/signup.component'
import { ProtectcompanyService } from 'src/app/guards/protectcompany.service'
import { LoadingpageComponent } from './credentialing/loadingpage/loadingpage.component';
import { ProtectloadingpageService } from 'src/app/guards/protectloadingpage.service'
import { OnboardingComponent } from 'src/app/credentialing/onboarding/onboarding.component'
import { ProtectOnboardingService } from 'src/app/guards/protect-onboarding.service'
import { LandingpageComponent } from 'src/app/credentialing/landingpage/landingpage.component'
import { PricingpageComponent } from 'src/app/credentialing/pricingpage/pricingpage.component'
import { PasswordresetpageComponent } from 'src/app/settingsmenu/accountinfo/passwordresetpage.component'
import { UsersettingspageComponent } from './settingsmenu/usersettingspage/usersettingspage.component'
import { Sidenav4settingsComponent } from './settingsmenu/sidenav4settings/sidenav4settings.component'
import { UserpermissionsComponent } from './settingsmenu/userpermissions/userpermissions.component';
import { ManageaccountComponent } from './settingsmenu/manageaccount/manageaccount.component';
import { BillinginformationComponent } from './settingsmenu/billinginformation/billinginformation.component';
import { PaymenthistoryComponent } from './settingsmenu/paymenthistory/paymenthistory.component';
import { PreferencesComponent } from './settingsmenu/preferences/preferences.component'
import { EmailinputComponent } from './credentialing/forgotpasswordmod/emailinput/emailinput.component'
import { ResetpasswordComponent } from './credentialing/forgotpasswordmod/resetpassword/resetpassword.component'
import { CreateUserFromEmailComponent } from './credentialing/create-user-from-email/create-user-from-email.component'
import { AddCreatedUserToCompanyComponent } from './credentialing/add-created-user-to-company/add-created-user-to-company.component'
import { Page404Component } from './credentialing/page404/page404.component'
import { WariningpageComponent } from './credentialing/wariningpage/wariningpage.component'
import { SettingsPermissionGuardService } from './guards/settings-permission-guard.service'
import { AuthGuard } from './guards/authguard.service';
import { BlockedWhenLoggedInService } from './guards/blocked-when-logged-in.service'
const routes: Routes = [
  { path: 'warning', component: WariningpageComponent },
  { path: '404', component: Page404Component },
  { path: 'adduser', component: AddCreatedUserToCompanyComponent },
  { path: 'createuser', component: CreateUserFromEmailComponent },
  { path: 'resetpassword', component: ResetpasswordComponent, canActivate: [BlockedWhenLoggedInService] },
  { path: 'emailinput', component: EmailinputComponent, canActivate: [BlockedWhenLoggedInService] },
  { path: 'pricingpage', component: PricingpageComponent, canActivate: [BlockedWhenLoggedInService] },
  { path: 'landingpage', component: LandingpageComponent, canActivate: [BlockedWhenLoggedInService] },
  //need some kinda guard for the signup page
  { path: 'signup', component: SignupComponent, canActivate: [BlockedWhenLoggedInService] },
  { path: 'companysignup', component: CompanysignupComponent, canActivate: [ProtectcompanyService], },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [ProtectOnboardingService] },
  { path: 'loadingpage', component: LoadingpageComponent, canActivate: [ProtectloadingpageService] },
  //need to add guard for login page
  { path: 'login', component: LoginComponent, canActivate: [BlockedWhenLoggedInService], },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'styledetails', component: StylesDetialsComponent, canActivate: [RegisterService] },
  { path: 'accounting', component: AccountingComponent, canActivate: [RegisterService] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'profitloss', component: ProfitlossComponent, canActivate: [RegisterService] },
  { path: 'balancesheets', component: BalancesheetComponent, canActivate: [RegisterService] },
  { path: 'statmentofcashflow', component: StatementOfCashFlowsComponent, canActivate: [RegisterService] },
  { path: 'advertisingreport', component: AdvertisingReportsComponent, canActivate: [RegisterService] },
  { path: 'campaignreport', component: CampaignReportComponent, canActivate: [RegisterService] },
  { path: 'adgroupreport', component: AdgroupReportComponent, canActivate: [RegisterService] },
  { path: 'productreport', component: ProductReportComponent, canActivate: [RegisterService] },
  { path: 'inventoryreport', component: InventoryReportsComponent, canActivate: [RegisterService] },
  { path: 'availableInventoryComponent', component: AvailableInventoryComponent, canActivate: [RegisterService] },
  { path: 'agedinventory', component: AgedInventoryComponent, canActivate: [RegisterService] },
  { path: 'inventorycosting', component: InventoryCostingComponent, canActivate: [RegisterService] },
  { path: 'productbalance ledger', component: ProductBalanceLedgerComponent, canActivate: [RegisterService] },
  { path: 'allorders', component: AllordersComponent, canActivate: [RegisterService] },
  { path: 'performancereport', component: PreformanceReportComponent, canActivate: [RegisterService] },
  { path: 'productperformance', component: ProductPreformanceComponent, canActivate: [RegisterService] },
  { path: 'productprofitability', component: ProductProfitabilityComponent, canActivate: [RegisterService] },
  { path: 'paymentreports', component: PaymentReportsComponent, canActivate: [RegisterService] },
  { path: 'settlementsreports', component: SettlementsReportComponent, canActivate: [RegisterService] },
  { path: 'replenishmentreports', component: ReplenishmentReportComponent, canActivate: [RegisterService] },
  { path: 'standardforcast', component: StandardForcastComponent, canActivate: [RegisterService] },
  { path: 'seasonalforcast', component: SeasonalForcastComponent, canActivate: [RegisterService] },
  { path: 'factoryforcast', component: FactoryForcastComponent, canActivate: [RegisterService] },
  { path: 'usersettings', component: UsersettingspageComponent, canActivate: [RegisterService] },
  { path: 'accountinfo', component: PasswordresetpageComponent, canActivate: [RegisterService] },
  { path: 'userpermissions', component: UserpermissionsComponent, canActivate: [RegisterService, SettingsPermissionGuardService] },
  { path: 'manageaccount', component: ManageaccountComponent, canActivate: [RegisterService] },
  { path: 'billinginformation', component: BillinginformationComponent, canActivate: [RegisterService] },
  { path: 'paymenthistory', component: PaymenthistoryComponent, canActivate: [RegisterService] },
  { path: 'preferences', component: PreferencesComponent, canActivate: [RegisterService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, FormsModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  navigate: any;
}
