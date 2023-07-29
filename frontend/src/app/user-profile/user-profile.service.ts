import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    private baseUrl = 'http://localhost:8080/api/motociclista';

    constructor(private http: HttpClient) { }

    cadastrarMotociclista(dados: Motociclista): Observable<Motociclista> {
        return this.http.post<Motociclista>(`${this.baseUrl}/cadastrar`, dados);
    }

    editarMotociclista(dados: Motociclista): Observable<Motociclista> {
        return this.http.post<Motociclista>(`${this.baseUrl}/alterar/${dados.id}`, dados);
    }

    buscaMotociclista(id: number): Observable<Motociclista> {
        return this.http.post<Motociclista>(`${this.baseUrl}/buscaPerfil/${id}`, id);
    }

}
