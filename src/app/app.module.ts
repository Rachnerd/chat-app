import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/shared/chat.service';
import { EXTERNAL_URL } from './tokens';


@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        ChatListComponent,
        ChatFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        {
            provide: EXTERNAL_URL,
            useValue: 'https://rachnerd-angular2-chat.herokuapp.com/api'
        },
        ChatService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
