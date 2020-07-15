import { Component, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  messages: string[] = [];
  parentMessageNumber: number = 1;
  subscription: Subscription;

  // KeyUp event on whole window - globally
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.key === "Delete") {
      this.toastr.info('Messages deleted!', 'Info!');
      this.messageService.clearMessages();
      this.parentMessageNumber = 1;
    }
  }

  constructor(private messageService: MessageService, private toastr: ToastrService) {
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        this.parentMessageNumber++;
      } else {
        // clear messages when empty message received
        this.messages = [];
        this.parentMessageNumber = 1;
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onNewMessage(newMessage: string) {
    if (newMessage) this.messages.push(newMessage)
    this.parentMessageNumber++;
  }
}
