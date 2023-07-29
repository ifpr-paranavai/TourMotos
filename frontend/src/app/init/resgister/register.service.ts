import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private baseUrl = 'http://localhost:8080/api/motociclista';

    constructor(private http: HttpClient) { }

    cadastrarMotociclista(dados: Motociclista): Observable<Motociclista> {
        return this.http.post<Motociclista>(`${this.baseUrl}/inserir`, dados);
    }

    logarMotociclista(dados: Motociclista): Observable<Motociclista>{
        return this.http.post<Motociclista>(`${this.baseUrl}/login`, dados);
    }

    logoutMotociclista(): Observable<Motociclista>{
        return this.http.post<Motociclista>(`${this.baseUrl}/logout`, this);
    }

}
