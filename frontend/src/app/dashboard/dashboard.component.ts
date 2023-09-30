import {Component, OnInit} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {single} from './data';
import {SessionStorage} from "../../SessionStorage";
import {MapsService} from "../maps/maps.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends SessionStorage implements OnInit {
    single: any[];
    routePerTime: any[] = [];
    routePerDistance: any[] = [];
    view: any[] = [340, 340];

    // options
    gradient: boolean = true;
    showLegend: boolean = false;
    showLabels: boolean = true;
    isDoughnut: boolean = false;

    constructor(private mapsService: MapsService) {
        super();
        Object.assign(this, {single});
    }

    async ngOnInit(): Promise<void> {
        const dadosRotas = await this.mapsService.buscaPorMotociclista(this.getId());

        // Usar Promise.all para buscar todas as paradas assincronamente
        const paradasPromises = dadosRotas.map(rota => this.mapsService.buscaParadaPorRota(rota.id));
        const paradasResults = await Promise.all(paradasPromises);

        // Mapear os valores de 'dadosRotas' e 'paradasResults' para 'routePerTime'
        this.routePerTime = dadosRotas.map((rota, index) => {
            const paradas = paradasResults[index];
            const paradaNames = paradas.map(parada => parada.nome).join(' -> ');
            return {
                name: `${rota.pontoPartida} -> ${paradaNames} -> ${rota.pontoDestino}`,
                value: rota.tempoViagem
            };
        });

        this.routePerDistance = dadosRotas.map((rota, index) => {
            const paradas = paradasResults[index];
            const paradaNames = paradas.map(parada => parada.nome).join(' -> ');
            return {
                name: `${rota.pontoPartida}  -> ${paradaNames} -> ${rota.pontoDestino}`,
                value: rota.distancia
            };
        });
    }

}
