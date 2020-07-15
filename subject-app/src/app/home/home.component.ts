import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  messageToSend: string;
  @Input() childMessageNumber: number;
  @Output() messageToSendOutput = new EventEmitter<string>();

  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  sendMessageViaOutput(): void {
    // send message through Output to parent
    if (this.messageToSend) {
      this.toastr.success('Message sent via Output!', 'Success!');
      this.messageToSendOutput.emit(this.childMessageNumber.toString() + ") " + this.messageToSend); // Through Output - sending message value
    }
  }

  sendMessageViaSubject(): void {
    // send message to subscribers via observable subject
    if (this.messageToSend) {
      this.toastr.success('Message sent via Subject!', 'Success!');
      this.messageService.sendMessage(this.childMessageNumber.toString() + ") " + this.messageToSend); // Through subject - sending message value
    }
  }

  clearMessages(inputRef): void {
    // clear messages
    this.toastr.info('Messages deleted!', 'Info!');
    this.messageService.clearMessages();
    this.messageToSend = '';
    inputRef.value = '';
  }

  onKeyUp(event: any) {
    this.messageToSend = event.target.value;
    if (event.key === "Enter" && this.messageToSend) {
        this.toastr.success('Message sent via Subject by press Enter!', 'Success!');
        this.messageService.sendMessage(this.childMessageNumber.toString() + ") " + this.messageToSend); // Through subject - sending message value by press enter
    }
  }

}
