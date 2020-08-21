import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AboutComponent } from './views/about/about.component';
import { FunctionsComponent } from './views/functions/functions.component';
import { TemplatesComponent } from './views/templates/templates.component';
import { TipsComponent } from './views/tips/tips.component';
import { TestComponent } from './views/test/test.component';
import { TrainingComponent } from './views/training/training.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SpreadsheetComponent } from './shared/components/spreadsheet/spreadsheet.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AboutComponent,
    FunctionsComponent,
    TemplatesComponent,
    TipsComponent,
    TestComponent,
    TrainingComponent,
    FooterComponent,
    SpreadsheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
