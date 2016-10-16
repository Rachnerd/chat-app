import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ws-chat-form',
    templateUrl: './chat-form.component.html',
    styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
    @Output() send: EventEmitter<string>
        = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit(input: HTMLInputElement) {
        this.send.emit(input.value);
        input.value = '';
    }
}
