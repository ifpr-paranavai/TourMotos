import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import axios from "axios";


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private baseUrl = 'http://localhost:8080/api/motociclista';

    constructor(private http: HttpClient) { }

    cadastrarMotociclista(dados: Motociclista){
        return axios.post(`${this.baseUrl}/cadastrar`, dados);
    }
}
