import {Component, OnInit} from '@angular/core';
import {MotorcycleService} from './motorcycle.service';
import {SessionStorage} from "../../../SessionStorage";
import {UserProfileService} from "../../user-profile/user-profile.service";

@Component({
    selector: 'motorcycle',
    templateUrl: './motorcycle.component.html',
    styleUrls: ['./motorcycle.component.css']
})

export class MotorcycleComponent extends SessionStorage implements OnInit {
    moto: Moto;
    motociclista: Motociclista;
    existeMoto: boolean;
    motos: Moto[] = []; // Adicione um array de motos

    constructor(private motorcycleService: MotorcycleService,
                private userProfileService: UserProfileService) {
        super();
    }

    ngOnInit() {
        this.motociclista = JSON.parse(sessionStorage.getItem('motociclista'));
        this.moto = {
            id: undefined,
            modelo: '',
            marca: ''

        };
        this.verificaSeExisteMoto(this.motociclista);
    }

    verificaSeExisteMoto(motociclista: Motociclista) {
        if (motociclista.moto != null) {
            this.existeMoto = true;
            this.motos.push(motociclista.moto); // Adicione a moto ao array de motos
        } else {
            this.existeMoto = false;
        }
    }

    cadastrarMoto(moto: Moto) {
        if (moto.marca != '' && moto.modelo != '') {
            this.motorcycleService.cadastrarMoto(moto).then(value => {
                this.motociclista.moto = value.data;
                this.userProfileService.editarMotociclista(this.motociclista).then(value1 =>
                    this.session(value1.data)
                );
            });
        }
    }

    excluirMoto(moto: Moto) {
        if (moto != null) {
            this.motorcycleService.excluirMoto(moto.id).then(value => {
                this.motos.splice(0,1);
                this.motociclista.moto = null;
                this.userProfileService.editarMotociclista(this.motociclista).then(value1 => {
                    this.session(value1.data)
                });
            });
        }
    }

}