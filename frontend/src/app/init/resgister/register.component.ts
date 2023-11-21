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
  url: string;
  regexEmail: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/;

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

  isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cleanCPF.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false;
    }

    // Calcula os dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }

    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }

    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;

    // Verifica se os dígitos calculados são iguais aos dígitos informados
    return digit1 === parseInt(cleanCPF.charAt(9)) && digit2 === parseInt(cleanCPF.charAt(10));
  }

  alertSuccess() {
    Swal.fire({
      title: 'Cadastrado com sucesso!',
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }

  alertError(title?: string) {
    if (!title) {
      Swal.fire({
        title: 'Erro ao cadastrar!',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000
      });
    } else {
      Swal.fire({
        title: `${title}`,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000
      });
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
        if (this.isValidCPF(motociclista.cpf)) {
          if (this.regexEmail.test(motociclista.email) == true) {
            if (motociclista.senha.length >= 6) {
              this.registerService.cadastrarMotociclista(motociclista).then(value => {
                this.alertSuccess();
                if (value) {
                  this.loginCadastro();
                }
              }).catch(reason => {
                this.alertError();
              });
            } else {
              this.alertError('A senha deve ter no mínimo 6 caracteres!');
            }
          } else {
            this.alertError('O e-mail é inválido!');
          }
        } else {
          this.alertError('O CPF é inválido!');
        }
      } else {
        this.alertError('Preencha os campos corretamente!');
      }
    } catch (e) {
      this.alertError();
    }
  }
}