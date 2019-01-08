import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {

  @Input() lastEditName: string; // Recogemos el valor del componente padre
  editedMembersLog: Array<string> = []; // Log con los nombre de los socios editados

  constructor() {}

  /**
   * Si cambia la variable del componente padre añade el nombre del usuario
   * editado al array del log.
   * @param changes cambio producido
   */
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes.lastEditName && !changes.lastEditName.isFirstChange()) {
      this.editedMembersLog.push(this.lastEditName);
      console.log('log:');
      console.log(this.editedMembersLog);
    }
  }

}
