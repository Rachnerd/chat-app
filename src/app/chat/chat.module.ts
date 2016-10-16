import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent, ChatListComponent]
})
export class ChatModule { }
