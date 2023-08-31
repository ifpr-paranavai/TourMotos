import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import axios from "axios";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private baseUrl = 'http://localhost:8080/api/motociclista';

    constructor() { }

    verificaMotociclista(dados: Motociclista){
        return axios.get(`${this.baseUrl}/buscaPerfilComLogin?email=${dados.email}&senha=${dados.senha}`);
    }
}
