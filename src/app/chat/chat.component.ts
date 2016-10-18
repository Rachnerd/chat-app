import { Component, OnInit } from '@angular/core';
import { ChatMessage } from './shared/chat-message.model';
import { ChatService } from './shared/chat.service';

@Component({
    selector: 'ws-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    messages: Array<ChatMessage> = [];

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.chatService
            .getMessages()
            .subscribe(
                messages => this.messages = messages,
                error => console.error(error)
            )
    }

    onSend(content: string): void {
        this.chatService
            .sendMessage(new ChatMessage(content, 'ChatApp'))
            .subscribe(
                res => this.ngOnInit(),
                error => console.error(error)
            );
    }
}
