import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthModule, DashboardModule, FinanceiroModule, AvaliacaoModule } from './index';
import { CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    AuthModule,
    DashboardModule,
    FinanceiroModule,
    AvaliacaoModule
  ],
  providers: [AuthModule, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
