import {Component, OnInit} from '@angular/core';
import {AuthService} from '../general-services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
