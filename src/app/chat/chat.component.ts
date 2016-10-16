import { Component, OnInit } from '@angular/core';
import { ChatMessage } from './shared/chat-message.model';

@Component({
    selector: 'ws-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    messages: Array<ChatMessage> = [];

    constructor() {
    }

    ngOnInit() {
    }

    onSend(content: string): void {
        this.messages.push(new ChatMessage(content));
    }
}
