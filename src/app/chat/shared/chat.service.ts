import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChatMessage } from './chat-message.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  constructor(private http: Http) {}

  getMessages():Observable<any> {
    return this.http
        .get('http://localhost:5000/api/chat')
        .map((res: Response) => res.json());
  }
  sendMessage(message: ChatMessage):Observable<Response> {
    return this.http
        .post('http://localhost:5000/api/chat', message);
  }
}