import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserProfileService} from "./user-profile.service";
import {Observable} from "rxjs";
import {SessionStorage} from "../../SessionStorage";
import Swal from "sweetalert2";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends SessionStorage implements OnInit {

    motociclista: Motociclista;

    constructor(private userProfileService: UserProfileService) {
        super();
    }

    ngOnInit() {
        if (this.getSession() == null || this.getSession() == undefined) {
            this.alertErrorAuth();
            window.location.href = 'http://localhost:4200/#';
        } else {
            this.motociclista = JSON.parse(sessionStorage.getItem('motociclista'));
        }
    }

    alertErrorAuth() {
        Swal.fire({
            title: 'Precisa de autorização!',
            icon: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000
        });
    }

    buscarPerfil(id: number) {
        this.userProfileService.buscaMotociclista(id);

    }

    cadastrar(motociclista: Motociclista) {
        this.userProfileService.cadastrarMotociclista(motociclista);
    }

    alertSuccess() {
        Swal.fire({
            title: 'Usuário editado com sucesso!',
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000
        });
    }

    alertError() {
        Swal.fire({
            title: 'Erro ao editar usuário!',
            icon: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000
        });
    }

    editar(motociclista: Motociclista) {
        if (motociclista) {
            try {
                this.userProfileService.editarMotociclista(motociclista).then(value => {
                    this.alertSuccess();
                    this.session(value.data);
                }).catch(reason => {
                    this.alertError();
                });
            } catch (e) {
                this.alertError();
            }
        }
    }

}
