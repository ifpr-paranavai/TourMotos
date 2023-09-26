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
    view: any[] = [340, 340];

    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';

    constructor(private mapsService: MapsService) {
        super();
        Object.assign(this, {single});
    }

    ngOnInit(): void {
    }

}
