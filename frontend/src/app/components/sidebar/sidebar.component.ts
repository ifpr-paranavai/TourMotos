import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Perfil de Usuário',  icon:'person', class: '' },
    { path: '/table-list', title: 'Histórico de Rotas',  icon:'content_paste', class: '' },
    { path: '/maps', title: 'Mapa',  icon:'location_on', class: '' },
    { path: '/logout', title: 'Sair',  icon:'exit_to_app', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  resgisterPage(){
      if(window.location.href=='http://localhost:4200/#/register' ||
          window.location.href=='http://localhost:4200/#/login' ||
          window.location.href=='http://localhost:4200/#/logout'
      ){
          return false
      }
      return true
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
