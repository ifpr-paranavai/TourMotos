import { Injectable } from '@angular/core';
import axios from "axios";


@Injectable({
    providedIn: 'root'
})
export class MotorcycleService {

    private baseUrl = 'http://localhost:8080/api/moto';
    private user = JSON.parse(sessionStorage.getItem('motociclista'));

    constructor() { }

    cadastrarMoto(dados: Moto) {
        return axios.post(`${this.baseUrl}/cadastrar`, dados);
    }

    excluirMoto(id: number){
        return axios.delete(`${this.baseUrl}/deletar/${id}`);
    }
}
