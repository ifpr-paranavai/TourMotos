import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import Swal from 'sweetalert2'

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

    alertSuccess() {
        Swal.fire({
            title:'Cadastrado com sucesso!',
            icon:'success',
            position:'top-end',
            showConfirmButton: false,
            timer: 1000});
    }

    alertError() {
        Swal.fire( {
            title:'Erro ao cadastrar!',
            icon:'error',
            position:'top-end',
            showConfirmButton: false,
            timer: 1000});
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
                    this.alertSuccess();
                    if(value){
                        this.loginCadastro();
                    }
                }).catch(reason => {
                    this.alertError();
                });
            }
        } catch (e) {
            this.alertError();
        }
    }
}