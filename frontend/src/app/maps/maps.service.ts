import {Injectable} from '@angular/core';
import axios from "axios";


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private baseUrlRota = 'http://localhost:8080/api/rota';
  private baseUrlParada = 'http://localhost:8080/api/parada';
  protected user = JSON.parse(sessionStorage.getItem('motociclista'));

  constructor() {
  }

  cadastrarRota(dados: Rota) {
    return axios.post(`${this.baseUrlRota}/cadastrar`, dados);
  }

  cadastrarParada(dados: Parada) {
    return axios.post(`${this.baseUrlParada}/cadastrar`, dados);
  }

  buscaPorMotociclista(dados: number): Promise<Rota[]> {
    return axios.get(`${this.baseUrlRota}/listar/${dados}`)
      .then(response => response.data as Rota[])
      .catch(error => {
        throw error;
      });
  }

  buscaParadaPorRota(dados: number): Promise<Parada[]> {
    return axios.get(`${this.baseUrlParada}/listar/${dados}`)
      .then(response => response.data as Parada[])
      .catch(error => {
        throw error;
      });
  }

  excluirRota(dados: number): Promise<Rota[]> {
    return axios.delete(`${this.baseUrlRota}/deletar/${dados}`);
  }


}
