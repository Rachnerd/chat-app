import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessage } from './shared/chat-message.model';
import { ChatService } from './shared/chat.service';
import { Subscription } from 'rxjs/Rx';
import { logError } from '../shared/utils';

@Component({
    selector: 'ws-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    public messages: Array<ChatMessage> = [];
    private messagesSubscription: Subscription;
    private sendMessageSubscription: Subscription;

    constructor(private chatService: ChatService) {
        this.messagesSubscription = this.chatService.messages$
            .subscribe(this.setMessages, logError);
        this.sendMessageSubscription = this.chatService.sendMessage$
            .subscribe(this.addMessage, logError);
    }

    public ngOnInit(): void {
        this.chatService.fetchMessages();
    }

    public ngOnDestroy(): void {
        //Prevent memory leaks
        this.messagesSubscription.unsubscribe();
        this.sendMessageSubscription.unsubscribe();
    }

    public onSend(content: string): void {
        this.chatService.sendMessage(new ChatMessage(content, 'ChatApp'));
    }

    private setMessages = (messages: Array<ChatMessage>) => {
        this.messages = messages
    };

    private addMessage = (message: ChatMessage) => {
        this.messages = [...this.messages, message];
    };
}
