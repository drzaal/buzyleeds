import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbButtonsModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
//import { MatDatepicker } from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { TargetListComponent } from './target-list/target-list.component';
import { TargetDetailComponent } from './target-detail/target-detail.component';
import { FinancialDetailComponent } from './financial-detail/financial-detail.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    TargetListComponent,
    TargetDetailComponent,
    FinancialDetailComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgbButtonsModule,
    NgbDatepickerModule,
    //MatDatepicker,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'target-list', component: TargetListComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
