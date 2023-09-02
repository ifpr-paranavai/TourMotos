import { Component, OnInit } from '@angular/core';
import { MotorcycleService } from './motorcycle.service';
import {SessionStorage} from "../../../SessionStorage";

@Component({
    selector: 'app-login',
    templateUrl: './motorcycle.component.html',
    styleUrls: ['./motorcycle.component.css']
})

export class MotorcycleComponent extends SessionStorage{

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

    constructor(private loginService: MotorcycleService) {
        super();
    }

    loginCadastro(): void {
        window.location.replace(this.urlRegister);
    }

    loginMotociclista(motociclista: Motociclista){
        try {
            if (motociclista.email &&
                motociclista.senha) {
                this.loginService.verificaMotociclista(motociclista).then(
                    value => {
                        this.session(value.data);
                        window.location.assign(this.urlDashboard);
                    }
                );

            }
        } catch (e) {
            console.error(e);
        }
    }
}