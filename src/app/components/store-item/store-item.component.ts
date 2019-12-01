import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit {

  @Input() user: User;

  constructor() {
    
   }
  
  ngOnInit() {
  }

}
