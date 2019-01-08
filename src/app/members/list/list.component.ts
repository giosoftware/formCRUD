import { Component } from '@angular/core';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(public sociosSrv: MembersService) {
    sociosSrv.message = '';
  }

}
