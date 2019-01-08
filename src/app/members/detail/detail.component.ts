import { Component } from '@angular/core';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(public sociosSrv: MembersService) {
    sociosSrv.message = '';
  }

}
