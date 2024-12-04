import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TaskManagementComponent } from './features/task-management/task-management.component';
import { ProjectManagementComponent } from './features/project-management/project-management.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { SidebarComponent } from './pages/dashbord/sidebar/sidebar.component';
import { NavbarComponent } from './pages/dashbord/navbar/navbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagementComponent,
    ProjectManagementComponent,
    DashbordComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
   HttpClientModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
