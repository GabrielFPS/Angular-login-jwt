import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api';
  private key = 'AIzaSyBB6WoUi5wmO9fwrk--9Fd0uHCS_Xa6cNA';
  userToken: string;

  constructor(private http: HttpClient) {
    this.getToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel){
    const authData = {
      username: usuario.username,
      password: usuario.password 
    }
    return this.http.post(
      `${this.url}/login`, authData
      ).pipe(
        map( resp => {
          
          this.saveToken(resp['token']);
          return resp;
        } )
      )
    ;
  }
  
  registrar(usuario: UsuarioModel){

    const authData = {
      username: usuario.username,
      password: usuario.password,
      email: usuario.email,
      returnSecureToken: true

    }

    return this.http.post(`${this.url}/clientes=${ this.key }`, authData);
  }

  private saveToken(token: string){
    this.userToken = token;
    localStorage.setItem('token', token);

    let hoy =new Date();
    hoy.setSeconds(28800);
    localStorage.setItem('expired', hoy.getTime().toString());
  }

  private getToken()
  {
    if(localStorage.getItem('token'))
    {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken ='';
    }

    return this.userToken;
  }

  isAuthenticated(): boolean{
    if(this.userToken.length <2 )
    {
      return false;
    }
    //tiempo de expiracion del token
    const expired =Number(localStorage.getItem('expired'));

    //tiempo actual
    const expiredDate = new Date();
    expiredDate.setTime(expired);

    if(expiredDate > new Date())
    {
      return true;
    }else{
      return false;
    }

    return this.userToken.length > 2;
  }
}
