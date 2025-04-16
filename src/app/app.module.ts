import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardsComponent } from './shared/components/cards/cards.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { DonutGraphComponent } from './shared/components/donut-graph/donut-graph.component';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppInterceptor } from './core/interceptor/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HeaderComponent,
    PaginatorComponent,
    ButtonComponent,
    DropdownComponent,
    DonutGraphComponent,
    LoginComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    IconComponent,
    MatDrawerContainer
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AppInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
