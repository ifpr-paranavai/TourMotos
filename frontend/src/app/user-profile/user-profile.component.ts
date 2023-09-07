import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserProfileService} from "./user-profile.service";
import {Observable} from "rxjs";
import {SessionStorage} from "../../SessionStorage";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends SessionStorage implements OnInit{

  motociclista: Motociclista;
  constructor(private userProfileService: UserProfileService) {
    super();
  }

  ngOnInit() {
    this.motociclista = JSON.parse(sessionStorage.getItem('motociclista'));
  }

  buscarPerfil(id: number){
    this.userProfileService.buscaMotociclista(id);

  }

  cadastrar(motociclista: Motociclista){
    this.userProfileService.cadastrarMotociclista(motociclista);
  }

  editar(motociclista: Motociclista){
    if(motociclista) {
      this.userProfileService.editarMotociclista(motociclista).then(value => {
        this.session(value.data);
      });
    }
  }

}
