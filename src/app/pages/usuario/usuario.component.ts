import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../model/usuarios';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  id?: string | null;
  title = "Nuevo Usuario";
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UsuariosService, private router: Router) {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      note: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.updateUsuario();
  }

  updateUsuario() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ? params.get('id') : "";
    })

    if (this.id != 'new') {
      this.title = "Modificar Usuario"
      this.userService.getUsuario(this.id).subscribe((data: any) => {
        this.usuarioForm.setValue({
          name: data.name,
          lastname: data.lastname,
          dni: data.dni,
          email: data.email,
          phone: data.phone,
          address: data.address,
          note: data.note
        });
      });
    }
  }

  onSubmit() {
    const data = this.usuarioForm.value as Usuario;
    if (this.id != 'new') {
      Swal.fire({
        title: 'Deseas actualizar los datos?',
        text: "No podras revertir el cambio!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Actualizar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Actualización exitosa',
            showConfirmButton: false,
            timer: 1300
          })
          this.userService.updateUsuario(data,this.id).subscribe((data: any) => {
            console.log(data);
          },error=>{
            console.log(error);
          });
          this.router.navigate(['/']);
        }else{
          this.router.navigate(['/']);
        }
      })
    } else {
      this.userService.postUsuario(data).subscribe((data: any) => {
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado exitosa',
        showConfirmButton: false,
        timer: 1300
      })
      this.router.navigate(['/']);
    }

  }
}
