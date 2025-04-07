import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardsComponent } from './shared/components/cards/cards.component';
import { LineGraphComponent } from './shared/components/line-graph/line-graph.component';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { DonutGraphComponent } from './shared/components/donut-graph/donut-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    LineGraphComponent,
    PieChartComponent,
    HeaderComponent,
    PaginatorComponent,
    FiltersComponent,
    ButtonComponent,
    DropdownComponent,
    DonutGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
