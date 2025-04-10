import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardsComponent } from './shared/components/cards/cards.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { DonutGraphComponent } from './shared/components/donut-graph/donut-graph.component';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { Interceptor } from './core/interceptor/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HeaderComponent,
    PaginatorComponent,
    FiltersComponent,
    ButtonComponent,
    DropdownComponent,
    DonutGraphComponent,
    LoginComponent,
    SidebarComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
