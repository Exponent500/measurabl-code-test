import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      CoreModule,
      HomeModule,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
