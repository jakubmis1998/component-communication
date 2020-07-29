import { Component, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  messages: string[] = [];
  parentMessageNumber: number = 1;
  subscription: Subscription;
  @ViewChild(HomeComponent) homeComponent: HomeComponent;

  constructor(private messageService: MessageService, private toastr: ToastrService, public dialog: MatDialog) {
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

  // KeyUp event on whole window - globally
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event): void {
    if (event.key === "Delete") {
      this.toastr.info('Messages deleted!', 'Info!');
      this.messageService.clearMessages();
      this.parentMessageNumber = 1;
    }
  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onNewMessage(newMessage: string): void {
    if (newMessage) this.messages.push(newMessage)
    this.parentMessageNumber++;
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { lastMessage: this.homeComponent.getLastMessage() },
      panelClass: 'custom-dialog'
    });
  }
}
