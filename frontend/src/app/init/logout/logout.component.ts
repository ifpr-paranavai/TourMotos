import {Component, OnInit} from '@angular/core';
import {SessionStorage} from "../../../SessionStorage";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})

export class LogoutComponent extends SessionStorage implements OnInit {

  urlNewSession: string = 'http://localhost:4200/#/login';

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.newSession();
    window.location.replace(this.urlNewSession);
  }
}