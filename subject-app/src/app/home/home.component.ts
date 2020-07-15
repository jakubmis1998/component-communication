import { Component, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  messageToSend: string = '';
  @Output() messageToSendOutput = new EventEmitter<string>();

  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  sendMessageViaOutput(): void {
    // send message through Output to parent
    this.toastr.success('Message sent via Output!', 'Success!');
    this.messageToSendOutput.emit(this.messageToSend); // Through Output - sending message value
  }

  sendMessageViaSubject(): void {
    // send message to subscribers via observable subject
    this.toastr.success('Message sent via Subject!', 'Success!');
    this.messageService.sendMessage(this.messageToSend); // Through subject - sending message value
  }

  clearMessages(inputRef): void {
    // clear messages
    this.toastr.warning('Messages deleted!', 'Success!');
    this.messageService.clearMessages();
    this.messageToSend = '';
    inputRef.value = '';
  }

  onKeyUp(event: any) {
    this.messageToSend = event.target.value;
  }

}
