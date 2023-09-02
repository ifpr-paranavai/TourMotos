import { Component, OnInit } from '@angular/core';
import {UserProfileService} from "./user-profile.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  motociclista: Motociclista;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.motociclista = JSON.parse(sessionStorage.getItem('motociclista'));
    this.motociclista = this.motociclista[0];
    this.buscarPerfil( this.motociclista.id);
  }

  buscarPerfil(id: number){
    this.userProfileService.buscaMotociclista(id);

  }

  cadastrar(motociclista: Motociclista){
    this.userProfileService.cadastrarMotociclista(motociclista);
  }

  editar(motociclista: Motociclista){
    if(motociclista) {
      this.userProfileService.editarMotociclista(motociclista);
    }
  }

}
