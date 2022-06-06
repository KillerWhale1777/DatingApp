import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/paginatiom';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      console.log('this.messages', this.messages);
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
  deleteMessages(id: number) {
    this.messageService.deleteMessages(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }
}
