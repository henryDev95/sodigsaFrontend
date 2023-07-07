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

  getAll() : Observable<Array<Usuario>>{
    return this.httpClient.get<Array<Usuario>>(`${this.URL_BASE}/getAllUsuarios`);
  }
}
