import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ws-chat-form',
    templateUrl: './chat-form.component.html',
    styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent {
    @Output() send: EventEmitter<string>
        = new EventEmitter<string>();

    constructor() {
    }

    onSubmit(input: HTMLInputElement) {
        this.send.emit(input.value);
        input.value = '';
    }
}
