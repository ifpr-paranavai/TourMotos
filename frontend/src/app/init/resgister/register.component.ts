import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  login: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  loginCadastro(): void{
    if(this.login === false){
      this.login = true;
    }else{
    this.login = false;
    }
  }

}
