import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  URL_BASE = "http://127.0.0.1:8000/api";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(`${this.URL_BASE}/getAllUsuarios`);
  }
  getUsuario(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.URL_BASE}/getUsuario/${id}`);
  }

  postUsuario(data: Usuario) {
    return this.httpClient.post<any>(`${this.URL_BASE}/postUsuario`, data);
  }

  updateUsuario(usuario: Usuario, id: any) {
    return this.httpClient.put<any>(`${this.URL_BASE}/updateUsuario/${id}`, usuario);
  }

  deleteUsuario(id: any) {
    return this.httpClient.delete<any>(`${this.URL_BASE}/deleteUsuario/${id}`);
  }
}
