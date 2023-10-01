import { Component, OnInit } from '@angular/core';
import {SessionStorage} from "../../SessionStorage";
import {MapsService} from "../maps/maps.service";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent extends SessionStorage implements OnInit {
  rotas: Rota[] = [];
  constructor(private mapsService: MapsService) {
    super();
  }

  ngOnInit() {
    this.mapsService.buscaPorMotociclista(this.getId()).then(dados => {
      this.rotas = dados;
    });
  }

  reload(){
    window.location.reload();
  }

  excluirRota(rota: Rota) {
    if (rota != null) {
      this.mapsService.excluirRota(rota.id).then(value => {
        this.reload();
      });
    }
  }

}
