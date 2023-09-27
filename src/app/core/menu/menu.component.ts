import { Component, Input } from '@angular/core';
import { StateService } from 'src/services/state.service';
import { MenuOption } from 'src/types/menu.options';

@Component({
  selector: 'killteam-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuOptions!: MenuOption[];
  menuLogedOptions!: MenuOption[];
  token: string;
  constructor(private state: StateService) {
    this.token = '';
    this.state.state.user$?.subscribe((data) => (this.token = data.token));
  }
  logout() {
    this.state.logout();
  }
}
