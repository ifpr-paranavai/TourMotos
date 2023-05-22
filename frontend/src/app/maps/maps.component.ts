import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    constructor() {
    }

    display: any;
    zoom = 4;
    center: google.maps.LatLngLiteral = {
        lat: -23.095579,
        lng: -52.476640
    };

    ngOnInit(): void {
    }

    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }

    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}