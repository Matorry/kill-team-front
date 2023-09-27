import { Component } from '@angular/core';
import { StateService } from 'src/services/state.service';
import { MenuOption } from 'src/types/menu.options';

@Component({
  selector: 'killteam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuLogedOptions: MenuOption[];
  menuOptions: MenuOption[];
  token: string;
  constructor(private state: StateService) {
    this.menuOptions = [
      { path: '/home', label: 'Home' },
      { path: '/login', label: 'Login' },
    ];
    this.menuLogedOptions = [
      { path: '/home', label: 'Home' },
      { path: '/commands', label: 'Commands' },
    ];
    this.token = '';
    this.state.state.user$?.subscribe((data) => (this.token = data.token));
  }
}
