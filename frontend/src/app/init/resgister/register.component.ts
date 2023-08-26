import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    motociclista: Motociclista;
    register: boolean;

    constructor(private registerService: RegisterService) {
    }

    ngOnInit() {
        this.register = true;
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
        this.register = !this.register;
    }

    inserirMotociclista(motociclista: Motociclista) {
        try {
            if (motociclista.nome &&
                motociclista.email &&
                motociclista.cpf &&
                motociclista.senha) {
                this.registerService.cadastrarMotociclista(motociclista);
                this.register = true;
            }
        } catch (e) {
            console.error(e);
        }
    }
}