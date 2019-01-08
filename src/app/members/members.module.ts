import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MembersRoutingModule } from './members-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { MembersService } from './members.service';


@NgModule({
  imports: [
    CommonModule,
    MembersRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MembersService],
  declarations: [DetailComponent, ListComponent],
  exports: [DetailComponent, ListComponent]
})
export class MembersModule { }
