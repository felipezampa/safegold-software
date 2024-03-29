import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieService } from 'ngx-cookie-service';
import { AgendaModule, AppComponent, AppRoutingModule, AuthModule, AvaliacaoModule, DashboardModule, FinanceiroModule } from './index';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    AuthModule,
    DashboardModule,
    FinanceiroModule,
    AvaliacaoModule,
    AgendaModule
  ],
  providers: [AuthModule, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
