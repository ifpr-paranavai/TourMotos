import { Injectable } from '@angular/core';
import axios from "axios";


@Injectable({
    providedIn: 'root'
})
export class MotorcycleService {

    private baseUrl = 'http://localhost:8080/api/moto';
    private user = JSON.parse(sessionStorage.getItem('motociclista'));

    constructor() { }

    verificaSeExisteMotocicleta(dados: Motociclista){
        return axios.get(`${this.baseUrl}/buscaPerfilComLogin?email=${dados.email}&senha=${dados.senha}`);
    }
}
