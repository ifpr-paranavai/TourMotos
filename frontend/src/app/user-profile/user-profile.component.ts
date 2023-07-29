import { Component, OnInit } from '@angular/core';
import {UserProfileService} from "./user-profile.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  motociclista: Motociclista;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
   // this.buscarPerfil(id);
  }

  buscarPerfil(id: number){
    this.userProfileService.buscaMotociclista(id);
  }

  cadastrar(motociclista: Motociclista){
    this.userProfileService.cadastrarMotociclista(motociclista);
  }

  editar(motociclista: Motociclista){
    if(motociclista.nome != this.motociclista.nome && motociclista.email != this.motociclista.email) {
      this.userProfileService.editarMotociclista(motociclista);
    }
  }

}
