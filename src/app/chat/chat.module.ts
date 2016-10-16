import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatFormComponent } from './chat-form/chat-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent, ChatListComponent, ChatFormComponent]
})
export class ChatModule { }
