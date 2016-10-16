import { Component, Input } from '@angular/core';
import { ChatMessage } from '../shared/chat-message.model';

@Component({
    selector: 'ws-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
    @Input() messages: Array<ChatMessage>;

    constructor() {
    }
}
