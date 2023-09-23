import { Injectable } from '@angular/core';
import axios from "axios";


@Injectable({
    providedIn: 'root'
})
export class MapsService {

    private baseUrl = 'http://localhost:8080/api/rota';
    protected user = JSON.parse(sessionStorage.getItem('motociclista'));

    constructor() { }

    cadastrarRota(dados: Rota) {
        return axios.post(`${this.baseUrl}/cadastrar`, dados);
    }

    buscaPorMotociclista(dados: number) {
        return axios.get(`${this.baseUrl}/listarPorMotociclista/${dados}`);
    }
}
