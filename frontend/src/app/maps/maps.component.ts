import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any; // Declaração para usar a biblioteca global do Google Maps

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    map: google.maps.Map;
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
    stopsList: any[];
    pointsOfInterest: string;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getCurrentLocation();
    }

    getAddressData() {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.center.lat},${this.center.lng}&key=AIzaSyDxKVH_v3Gte9zR-U8CJW3bg6Me9sOq9V8`;
        this.http.get<any>(geocodingUrl).subscribe((response) => {
            if (response.status === 'OK' && response.results.length > 0) {
                this.addressData = response.results;
                this.startPoint = this.addressData[0].formatted_address
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
                    this.initMap();
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

        if (this.stops == undefined || this.stops == '') {
            this.stops = null;
        }

        const request = {
            origin: this.startPoint,
            destination: this.endPoint,
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: google.maps.TrafficModel.OPTIMISTIC
            },
            provideRouteAlternatives: true,
            unitSystem: google.maps.UnitSystem.METRIC,
            optimizeWaypoints: true,
            waypoints: this.stopsList,
            region: 'BR'
        };

        this.directionsService.route(request, (response, status) => {
            if (status === 'OK') {
                this.directionsRenderer.setDirections(response);

                // Criar o link para o Google Maps com a rota
                const route = response.routes[0];
                const startLatLng = `${route.legs[0].start_location.lat()},${route.legs[0].start_location.lng()}`;
                const endLatLng = `${route.legs[0].end_location.lat()},${route.legs[0].end_location.lng()}`;
                const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${startLatLng}&destination=${endLatLng}`;

                // Exibir o link no console
                console.log('Link para a rota no Google Maps:', mapsLink);

                // Outras informações importantes, como distância e duração
                const distance = route.legs[0].distance.text;
                const duration = route.legs[0].duration.text;

                console.log('Distância:', distance);
                console.log('Duração:', duration);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }


    criarObjetos(stringSeparadaPorVirgulas) {
        const valores = stringSeparadaPorVirgulas.split(',');

        this.stopsList = valores.map((valor) => {
            return { location: valor.trim() };
        });
    }

    submitForm() {
        if (this.startPoint) {
            if (this.endPoint) {
                this.criarObjetos(this.stops);
                this.initMap();
            } else {
                this.endPoint = '';
            }
        } else {
            this.startPoint = '';
        }
    }
}
