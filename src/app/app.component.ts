import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat/shared/chat.service';

@Component({
    selector: 'ws-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'app works!';

    constructor(private chatService: ChatService) {
    }

    public ngOnInit(): void {
        this.chatService.fetchMessages();
    }
}
