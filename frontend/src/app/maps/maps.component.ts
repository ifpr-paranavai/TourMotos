import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    map: google.maps.Map;
    origin: string;
    center: google.maps.LatLngLiteral;
    zoom = 18;
    addressData: any = [];
    display: any;
    request: any = {};
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    startPoint: string;
    endPoint: string;
    stops: string;
    pointsOfInterest: string;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.getCurrentLocation();
    }

    getAddressData(){
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.center.lat},${this.center.lng}&key=AIzaSyDxKVH_v3Gte9zR-U8CJW3bg6Me9sOq9V8`;
        this.http.get<any>(geocodingUrl).subscribe((response) => {
            if (response.status === 'OK' && response.results.length > 0) {
                this.addressData = response.results;
                this.origin = this.addressData[0].formatted_address
                this.initMap();
            }
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.getAddressData();
                },
                (error) => {
                    console.log('Erro ao obter localização:', error);
                }
            );
        } else {
            console.log('Geolocalização não é suportada neste navegador.');
        }
    }

    initMap() {
        const mapOptions = {
            center: this.center,
            zoom: this.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.directionsRenderer.setMap(this.map);

        const request = {
            origin: this.origin,
            destination: 'Maringá, PR',
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: google.maps.TrafficModel.OPTIMISTIC
            },
            provideRouteAlternatives: true,
            unitSystem: google.maps.UnitSystem.METRIC,
            optimizeWaypoints: true,
            waypoints: [
                { location: 'Nova Esperança, PR' }
            ],
            region: 'BR'
        };

        this.directionsService.route(request, (response, status) => {
            if (status === 'OK') {
                this.directionsRenderer.setDirections(response);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }

    submitForm() {
        // Lógica para processar o formulário
        console.log('Formulário enviado!');
        console.log('Ponto de partida:', this.startPoint);
        console.log('Ponto de chegada:', this.endPoint);
        console.log('Paradas:', this.stops);
        console.log('Pontos de interesse:', this.pointsOfInterest);
    }
}
