import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.list('/projectName/firstProject/items').valueChanges().subscribe(console.log);
  }

}
