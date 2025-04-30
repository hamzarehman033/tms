import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardsComponent } from './shared/components/cards/cards.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DonutGraphComponent } from './shared/components/donut-graph/donut-graph.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppInterceptor } from './core/interceptor/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HeaderComponent,
    DonutGraphComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    IconComponent,
    MatDrawerContainer,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AppInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
