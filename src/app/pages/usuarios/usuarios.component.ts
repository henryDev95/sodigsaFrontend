import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users?:Array<Usuario>;
  constructor(private usuarioService:UsuariosService){}

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(data=>{
        this.users = data;
    });
  }

}
