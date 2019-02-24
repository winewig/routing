import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../crisis-center/message.service';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent {
  details: string;
  message: string;
  sending = false;

  constructor(private router: Router, private messageService: MessageService) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}])
      .then( () => this.messageService.add('Close the contact popup'));
  }
}
