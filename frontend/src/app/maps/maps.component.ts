import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    @ViewChild('maps', { static: true }) mapElement: ElementRef;

    map: google.maps.Map;
    latitude: number = 0;
    longitude: number = 0;

    constructor(private geolocation: Location) {}

    display: any;
    zoom = 18;
    center: google.maps.LatLngLiteral = {
        lat: 0,
        lng: 0
    };

    ngOnInit(): void {
        this.getCurrentLocation();
    }

    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = event.latLng.toJSON();
    }

    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.center = { lat: this.latitude, lng: this.longitude };

                    // Recarregue o mapa com as informações atuais
                    this.map = new google.maps.Map(this.mapElement.nativeElement, {
                        center: this.center,
                        zoom: this.zoom
                    });

                    // Adicione um marcador para a localização atual
                    new google.maps.Marker({
                        position: this.center,
                        map: this.map
                    });

                    console.log(this.center);
                },
                (error) => {
                    console.log('Erro ao obter localização:', error);
                }
            );
        } else {
            console.log('Geolocalização não é suportada neste navegador.');
        }
    }
}
