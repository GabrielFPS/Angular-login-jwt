import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordar = false;

  constructor(private auth: AuthService, private router: Router) { 
  }

  ngOnInit() {
    if ( localStorage.getItem('username'))
    {
      this.usuario.username = localStorage.getItem('username');
      this.recordar =true;
    }
    
  }
  
  login(form: NgForm){
      if (form.invalid)
      {
        return;
      }
      Swal.fire({
        icon: 'info',
        title: 'Iniciando sesion',
        text: 'Espere por favor ...',
        allowOutsideClick: false
      });

      Swal.showLoading();

      this.auth.login(this.usuario)
      .subscribe(resp=>{
        Swal.close();
        
        if(this.recordar)
        {
          localStorage.setItem('username', this.usuario.username);
        }

        this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.mensaje
        });
      });
  }

}
