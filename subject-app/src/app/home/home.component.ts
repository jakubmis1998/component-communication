import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { MessageService } from '../message.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  messageToSend: string;
  lastMessage: string = '';
  @Input() childMessageNumber: number;
  @Output() messageToSendOutput = new EventEmitter<string>();
  @ViewChild('inputRef') inputRef: ElementRef;

  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  sendMessageViaOutput(): void {
    // send message through Output to parent
    if (this.messageToSend) {
      this.lastMessage = this.messageToSend;
      this.toastr.success('Message sent via Output!', 'Success!');
      this.messageToSendOutput.emit(this.childMessageNumber.toString() + ") " + this.messageToSend); // Through Output - sending message value
      this.clearInput();
    }
  }

  sendMessageViaSubject(): void {
    // send message to subscribers via observable subject
    if (this.messageToSend) {
      this.lastMessage = this.messageToSend;
      this.toastr.success('Message sent via Subject!', 'Success!');
      this.messageService.sendMessage(this.childMessageNumber.toString() + ") " + this.messageToSend); // Through subject - sending message value
      this.clearInput();
    }
  }

  clearMessages(): void {
    // clear messages
    this.toastr.info('Messages deleted!', 'Info!');
    this.messageService.clearMessages();
    this.clearInput();
  }

  onKeyUp(event: any): void {
    this.messageToSend = event.target.value;
    if (event.key === "Enter" && this.messageToSend) {
      this.lastMessage = this.messageToSend;
        this.toastr.success('Message sent via Subject by press Enter!', 'Success!');
        this.messageService.sendMessage(this.childMessageNumber.toString() + ") " + this.messageToSend); // Through subject - sending message value by press enter
        this.clearInput();
      }
  }

  clearInput(): void {
    this.messageToSend = '';
    this.inputRef.nativeElement.value = '';
  }

  getLastMessage(): string {
    return this.lastMessage;
  }
}
