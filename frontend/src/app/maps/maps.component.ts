import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapsService} from "./maps.service";
import {SessionStorage} from "../../SessionStorage";
import Swal from "sweetalert2";

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
  stopsListBack: any[];
  link: string;
  rota: Rota;
  parada: Parada;
  mapsLink = "";
  rotaCompleta = "";

  constructor(private http: HttpClient, private mapsService: MapsService) {
    super();
  }

  ngOnInit(): void {
    if (this.getSession() == null || this.getSession() == undefined) {
      this.alertError();
      window.location.href = 'http://localhost:4200/#';
    } else {
      this.alertInfo();
      this.getCurrentLocation();
      this.rota = {
        id: null,
        link: '',
        tempoViagem: '',
        pontoDestino: '',
        pontoPartida: '',
        motociclista: null,
        distancia: null,
        rotaCompleta:'',
      };
      this.parada = {
        id: null,
        rota: null,
        endereco: '',
        nome: ''
      }
    }
  }

  alertInfo() {
    Swal.fire({
      text: 'Rotas muito distantes podem não ser reconhecidas.',
      icon: 'info',
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
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

    if (this.stopsList == undefined || this.stopsList.length <= 0) {
      this.stops = null;
      this.stopsList = [];
    } else {
      this.submitForm(this.stopsList);
    }

    const request = {
      origin: this.startPoint,
      destination: this.endPoint,
      travelMode: "DRIVING",
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
        if (waypointsString.length > 0) {
          this.mapsLink = `https://www.google.com/maps/dir/${startLatLng}/${waypointsString}/${endLatLng}`;
        } else {
          this.mapsLink = `https://www.google.com/maps/dir/${startLatLng}/${endLatLng}`;
        }

        function convertDaysToMinutes(value: string): number {
          const daysMatch = value.match(/(\d+)\s*dia(s)?/);
          if (daysMatch) {
            const days = parseFloat(daysMatch[1]);
            if (!isNaN(days)) {
              return days * 24 * 60; // Converter dias em minutos (1 dia = 24 horas = 24 * 60 minutos)
            }
          }
          return 0; // Se não houver "dia" ou "dias", retorna 0 minutos
        }

        // Outras informações importantes, como distância e duração
        for (let i = 0; i < route.legs.length; i++) {
          distance += route.legs[i].distance.text;
          duration += route.legs[i].duration.text + ',';
        }
        distanceValues = distance.split('km').map(value => parseFloat(value.replace(',', '.')));
        distanceValues.pop();
        // Divida a string em valores individuais usando split()
        durationValues = duration.split(',').reduce((acc, value) => {
          if (value.includes('dia') || value.includes('dias')) {
            const daysMinutes = convertDaysToMinutes(value);
            if (daysMinutes > 0) {
              acc.push(daysMinutes);
            }
            // Verificar se a string contém "hora" ou "minutos"
            if (value.includes('hora') || value.includes('horas')) {
              // Verificar se a string contém "hora"
              if (value.includes('minutos') || value.includes('minuto')) {
                // Se a string contiver "hora" e "minutos", extraia ambos os valores
                const hoursMinutesMatch = value.match(/(\d+)\s*horas?\s*(\d+)\s*minutos?/
                );
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
                const hoursMatch = value.match(/(\d+)\s*hora(s)?/);
                if (hoursMatch) {
                  const hours = parseFloat(hoursMatch[1]);
                  if (!isNaN(hours)) {
                    acc.push(hours * 60);
                  }
                }
              }
            }
          } else if (value.includes('hora') || value.includes('horas')) {
            // Verificar se a string contém "hora"
            if (value.includes('minutos') || value.includes('minuto')) {
              // Se a string contiver "hora" e "minutos", extraia ambos os valores
              const hoursMinutesMatch = value.match(/(\d+)\s*horas?\s*(\d+)\s*minutos?/
              );
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
              const hoursMatch = value.match(/(\d+)\s*hora(s)?/);
              if (hoursMatch) {
                const hours = parseFloat(hoursMatch[1]);
                if (!isNaN(hours)) {
                  acc.push(hours * 60);
                }
              }
            }
          } else if (value.includes('minutos') || value.includes('minuto')) {
            // Extraia o número antes de "minutos" e adicione ao acumulador
            const minutesMatch = value.match(/(\d+)\s*minuto?s?/
            );
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

        const listaParada = this.stopsList.map(waypoint => waypoint.location.replaceAll("+","")).join(',');
        if (listaParada.length > 0) {
          this.rotaCompleta = `${this.startPoint},${listaParada},${this.endPoint}`;
        } else {
          this.rotaCompleta = `${this.startPoint},${this.endPoint}`;
        }

        this.rota.link = this.mapsLink;
        this.rota.distancia = totalDistance;
        this.rota.motociclista = this.getSession();
        this.rota.pontoPartida = this.startPoint;
        this.rota.pontoDestino = this.endPoint;
        this.rota.tempoViagem = totalDuration;
        this.rota.rotaCompleta = this.rotaCompleta;

        try {
          this.mapsService.cadastrarRota(this.rota).then(value => {
            this.alertRouteSuccess();
            for (let i = 0; i < this.stopsListBack.length; i++) {
              this.parada.rota = value.data;
              this.parada.nome = this.stopsListBack[i];
              this.parada.endereco = this.stopsListBack[i];
              try {

                this.mapsService.cadastrarParada(this.parada).then(value1 => {
                  this.alertStopsSuccess();
                }).catch(reason => {
                  this.alertStopsError();
                });
              } catch (e) {
                this.alertStopsError();
              }
            }
          });
        } catch (e) {
          this.alertRouteError();
        }

        this.startPoint = '';
        this.endPoint = '';
        this.stops = '';
        this.stopsList = [];
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  alertRouteSuccess() {
    Swal.fire({
      title: 'Rota cadastrada com sucesso!',
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }

  alertRouteError() {
    Swal.fire({
      title: 'Erro ao cadastrar rota!',
      icon: 'error',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }

  alertStopsSuccess() {
    Swal.fire({
      title: 'Paradas cadastradas com sucesso!',
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }

  alertStopsError() {
    Swal.fire({
      title: 'Erro ao cadastrar paradas!',
      icon: 'error',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }
  addStop() {
    this.stopsList.push({ location: '' });
  }

  removeStop(index: number) {
    this.stopsList.splice(index, 1);
  }

  submitForm(stopsList: any[]) {
    if (this.startPoint) {
      if (this.endPoint) {
        if (stopsList && stopsList.length > 0) {
          this.stopsList = stopsList;
          this.stopsListBack = stopsList.map(stop => stop.location.replaceAll("+",""));
        }
      } else {
        this.endPoint = '';
      }
    } else {
      this.startPoint = '';
    }
  }
}
