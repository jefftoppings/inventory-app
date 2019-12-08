import {Component, Input, OnInit} from '@angular/core';
import {User} from '../general-services/auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @Input() user$: Observable<User>;

  constructor() { }

  ngOnInit() {
  }

}
