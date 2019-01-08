import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  lastEdited: string; // Guarda el nombre del último socio editado

  /**
   * Si ha habido un cambio en la applicación actualiza la variable lastEdited
   */
  ngDoCheck() {
    this.lastEdited = sessionStorage.getItem('lastEdited');
  }
}
