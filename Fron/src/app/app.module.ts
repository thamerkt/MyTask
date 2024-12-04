import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { SidebarComponent } from './pages/dashbord/sidebar/sidebar.component';
import { NavbarComponent } from './pages/dashbord/navbar/navbar.component';
import { TaskManagementComponent } from './features/task-management/task-management.component';
import { ProjectManagementComponent } from './features/project-management/project-management.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Socket } from 'socket.io';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://exampleUrl.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    SidebarComponent,
    NavbarComponent,
    TaskManagementComponent,
    ProjectManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    SocketIoModule.forRoot(config)
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
