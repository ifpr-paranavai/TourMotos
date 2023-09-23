import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import {SessionStorage} from "../../../SessionStorage";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    motociclista: Motociclista;
    url: string

    constructor(private registerService: RegisterService) {
    }

    ngOnInit() {
        this.url = 'http://localhost:4200/#/login';
        this.motociclista = {
            id: null,
            nome: '',
            email: '',
            senha: '',
            cpf: '',
            rota: null
        }
    }

    loginCadastro(): void {
        window.location.replace(this.url);
    }

    inserirMotociclista(motociclista: Motociclista) {
        try {
            if (motociclista.nome &&
                motociclista.email &&
                motociclista.cpf &&
                motociclista.senha) {
                this.registerService.cadastrarMotociclista(motociclista).then(value => {
                    if(value){
                        this.loginCadastro();
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
}