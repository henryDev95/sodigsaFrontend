import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users?: Array<Usuario>;
  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuarioService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  eliminarProducto(id: any) {
    Swal.fire({
      title: 'Deseas eliminar el usuario?',
      text: "No podras revertir el cambio!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminacion exitosa',
          showConfirmButton: false,
          timer: 1300
        })
        this.usuarioService.deleteUsuario(id).subscribe(data => {
          this.cargarDatos();
        }, error => {
          console.log(error);
        });
      }
    })
  }

}
