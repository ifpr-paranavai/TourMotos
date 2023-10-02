import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {SessionStorage} from "../../../SessionStorage";
import Swal from "sweetalert2";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent extends SessionStorage {

    motociclista: Motociclista = {
        id: null,
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        rota: null
    };
    urlRegister: string = 'http://localhost:4200/#/register';
    urlDashboard: string = 'http://localhost:4200/#/dashboard';

    constructor(private loginService: LoginService) {
        super();
    }

    alertSuccess() {
        Swal.fire({
                title: 'Login realizado com sucesso!',
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000
            }
        );
    }

    alertError() {
        Swal.fire({
            title: 'Erro ao realizar login!',
            icon: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000
        });
    }

    loginCadastro(): void {
        window.location.replace(this.urlRegister);
    }

    loginMotociclista(motociclista: Motociclista) {
        try {
            if (motociclista.email &&
                motociclista.senha) {
                this.loginService.verificaMotociclista(motociclista).then(
                    value => {
                        this.session(value.data);
                        this.alertSuccess();
                        window.location.assign(this.urlDashboard);
                    }
                ).catch(reason => {
                    this.alertError();
                });

            }
        } catch (e) {
            this.alertError();
        }
    }
}