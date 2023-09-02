import { Component, OnInit } from '@angular/core';
import { MotorcycleService } from './motorcycle.service';
import {SessionStorage} from "../../../SessionStorage";

@Component({
    selector: 'motorcycle',
    templateUrl: './motorcycle.component.html',
    styleUrls: ['./motorcycle.component.css']
})

export class MotorcycleComponent extends SessionStorage{

    moto: Moto = {
        id: null,
        marca: '',
        modelo: ''
    };

    constructor() {
        super();
    }


}