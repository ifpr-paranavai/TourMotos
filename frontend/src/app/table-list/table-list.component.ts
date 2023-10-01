import { Component, OnInit } from '@angular/core';
import {SessionStorage} from "../../SessionStorage";
import {MapsService} from "../maps/maps.service";
import Swal from "sweetalert2";

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

  alertSuccess() {
    Swal.fire({
      title:'Rota excluída com sucesso!',
      icon:'success',
      position:'top-end',
      showConfirmButton: false,
      timer: 1000});
  }

  excluirRota(rota: Rota) {
    if (rota != null) {
      this.mapsService.excluirRota(rota.id).then(value => {
        this.alertSuccess();
        this.reload();
      });
    }
  }

}
