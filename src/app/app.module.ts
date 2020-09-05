import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'; //los modulos siempre van en los import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { HttpClientModule} from '@angular/common/http'; // siempre se importa cuando se trabaja con servicios 

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
