import {Component, OnInit} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts'
import {SessionStorage} from "../../SessionStorage";
import {MapsService} from "../maps/maps.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends SessionStorage implements OnInit {
  routePerTime: any[] = [];
  routePerDistance: any[] = [];
  view: any[] = [500, 320];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';
  subtitulo = '';

  constructor(private mapsService: MapsService) {
    super();
    if (this.getSession() == null || this.getSession() == undefined) {
      this.alertError();
      window.location.href = 'http://localhost:4200/#';
    }
  }

  alertError() {
    Swal.fire({
      title: 'Precisa de autorização!',
      icon: 'error',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }

  alertInfo() {
    Swal.fire({
      title: 'Cadastre uma ou mais rotas para poder utilizar a dashboard.',
      icon: 'info',
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    }).then(value => {
      window.location.href = 'http://localhost:4200/#/maps';
    });
  }

  async ngOnInit(): Promise<void> {
    const dadosRotas = await this.mapsService.buscaPorMotociclista(this.getId());
    if (dadosRotas.length <= 0) {
      this.alertInfo();
    } else {
      // Usar Promise.all para buscar todas as paradas assincronamente
      const paradasPromises = dadosRotas.map(rota => this.mapsService.buscaParadaPorRota(rota.id));
      const paradasResults = await Promise.all(paradasPromises);

      // Mapear os valores de 'dadosRotas' e 'paradasResults' para 'routePerTime'
      this.routePerTime = dadosRotas.map((rota, index) => {
        const paradas = paradasResults[index];
        const paradaNames = paradas.map(parada => parada.nome).join(' -> ');
        if (paradas.length > 0) {
          return {
            name: `${rota.pontoPartida} -> ${paradaNames} -> ${rota.pontoDestino}`,
            value: rota.tempoViagem
          };
        }else{
          return {
            name: `${rota.pontoPartida} -> ${rota.pontoDestino}`,
            value: rota.tempoViagem
          };
        }
      });

      this.routePerDistance = dadosRotas.map((rota, index) => {
        const paradas = paradasResults[index];
        const paradaNames = paradas.map(parada => parada.nome).join(' -> ');
        if (paradas.length > 0) {
          return {
            name: `${rota.pontoPartida} -> ${paradaNames} -> ${rota.pontoDestino}`,
            value: rota.distancia
          };
        }else{
          return {
            name: `${rota.pontoPartida} -> ${rota.pontoDestino}`,
            value: rota.distancia
          };
        }
      });
    }
  }

}
