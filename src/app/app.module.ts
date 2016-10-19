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
import { HomeComponent } from './home/home.component';
import { WsChatAppRoutingModule } from './app-routing.module';


@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        ChatListComponent,
        ChatFormComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        WsChatAppRoutingModule
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
