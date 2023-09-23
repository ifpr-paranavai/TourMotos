import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapsService} from "./maps.service";
import {SessionStorage} from "../../SessionStorage";

declare var google: any; // Declaração para usar a biblioteca global do Google Maps

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent extends SessionStorage implements OnInit {
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
    link: string;
    rota: Rota;
    parada: Parada;

    constructor(private http: HttpClient, private mapsService: MapsService) {
        super();
    }

    ngOnInit(): void {
        this.getCurrentLocation();
        this.rota = {
            id: null,
            link:'',
            tempoViagem:'',
            pontoDestino:'',
            pontoPartida:'',
            motociclista: null,
            distancia: null,
        }
    }

    getAddressData() {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.center.lat},${this.center.lng}&key=AIzaSyDxKVH_v3Gte9zR-U8CJW3bg6Me9sOq9V8`;
        this.http.get<any>(geocodingUrl).subscribe((response) => {
            if (response.status === 'OK' && response.results.length > 0) {
                this.addressData = response.results;
                for (let i = 0; i < this.addressData.length; i++) {
                    if (this.addressData[i].address_components.length == 3) {
                        this.startPoint = this.addressData[i].formatted_address
                    }
                }
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
            this.stopsList = [];
        } else {
            this.submitForm(this.stops);
        }

        const request = {
            origin: this.startPoint,
            destination: this.endPoint,
            travelMode: google.maps.TravelMode.TWO_WHEELER,
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
                const startLatLng = request.origin.trim().replace(/\s+/g, '+');
                const endLatLng = request.destination.trim().replace(/\s+/g, '+');
                let distance = '';
                let distanceValues = [];
                let duration = '';
                let durationValues = [];

                // Adicione os pontos de parada à URL com "|"
                const waypointsString = this.stopsList.map(waypoint => waypoint.location).join('/');
                const mapsLink = `https://www.google.com/maps/dir/${startLatLng}/${waypointsString}/${endLatLng}`;

                // Exibir o link no console
                console.log('Link para a rota no Google Maps:', mapsLink);

                // Outras informações importantes, como distância e duração
                for (let i = 0; i < route.legs.length; i++) {
                    distance += route.legs[i].distance.text;
                    duration += route.legs[i].duration.text + ',';
                }
                distanceValues = distance.split('km').map(value => parseFloat(value.replace(',', '.')));
                distanceValues.pop();
                // Divida a string em valores individuais usando split()
                durationValues = duration.split(',').reduce((acc, value) => {
                    // Verifique se a string contém "minutos"
                    if (value.includes('hora') || value.includes('horas')) {
                        // Verifique se a string contém "hora"
                        if (value.includes('minutos') || value.includes('minuto')) {
                            // Se a string contiver "hora" e "minutos", extraia ambos os valores
                            const hoursMinutesMatch = value.match(/(\d+)\s*hora\s*(\d+)\s*minutos/);
                            if (hoursMinutesMatch) {
                                const hours = parseFloat(hoursMinutesMatch[1]);
                                const minutes = parseFloat(hoursMinutesMatch[2]);
                                if (!isNaN(hours) && !isNaN(minutes)) {
                                    // Converta horas para minutos e some com os minutos adicionais
                                    acc.push(hours * 60 + minutes);
                                }
                            }
                        } else {
                            // Se a string contiver apenas "hora", extraia o valor antes de "hora" e multiplique por 60, depois adicione ao acumulador
                            const hoursMatch = value.match(/(\d+)\s*hora/);
                            if (hoursMatch) {
                                const hours = parseFloat(hoursMatch[1]);
                                if (!isNaN(hours)) {
                                    acc.push(hours * 60);
                                }
                            }
                        }
                    } else if (value.includes('minutos') || value.includes('minuto')) {
                        // Extraia o número antes de "minutos" e adicione ao acumulador
                        const minutesMatch = value.match(/(\d+)\s*minutos/);
                        if (minutesMatch) {
                            const minutes = parseFloat(minutesMatch[1]);
                            if (!isNaN(minutes)) {
                                acc.push(minutes);
                            }
                        }
                    }
                    return acc;
                }, []);

                const totalDistance = distanceValues.reduce((acc, value) => acc + value, 0);

                // Somando os valores da duração
                const totalDuration = durationValues.reduce((acc, value) => acc + value, 0);

                this.rota.link = mapsLink;
                this.rota.distancia = totalDistance;
                this.rota.motociclista = this.getSession();
                this.rota.pontoPartida = this.startPoint;
                this.rota.pontoDestino = this.endPoint;
                this.rota.tempoViagem = totalDuration ;

                this.mapsService.cadastrarRota(this.rota);

                this.startPoint = '';
                this.endPoint = '';
                this.stops = '';
                this.stopsList = [];
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }


    criarObjetos(stringSeparadaPorVirgulas) {
        if (stringSeparadaPorVirgulas) {
            const valores = stringSeparadaPorVirgulas.split(',');

            this.stopsList = valores.map((valor) => {
                // Substitua espaços por '+'
                const location = valor.trim().replace(/\s+/g, '+');
                return {location};
            });
        }
    }

    submitForm(stops: string) {
        if (this.startPoint) {
            if (this.endPoint) {
                this.criarObjetos(stops);
            } else {
                this.endPoint = '';
            }
        } else {
            this.startPoint = '';
        }
    }
}
