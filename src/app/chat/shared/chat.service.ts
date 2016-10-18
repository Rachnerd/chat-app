import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChatMessage } from './chat-message.model';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
    public messages$: Observable<Array<ChatMessage>>;
    private messagesSubject: Subject<Array<ChatMessage>> = new Subject<Array<ChatMessage>>();

    public sendMessage$: Observable<ChatMessage>;
    private sendMessageSubject: Subject<ChatMessage> = new Subject<ChatMessage>();

    constructor(private http: Http) {
        this.messages$ = this.messagesSubject.asObservable();
        this.sendMessage$ = this.sendMessageSubject.asObservable();
    }

    public fetchMessages(): void {
        this.http
            .get('http://localhost:5000/api/chat')
            .map((res: Response) => res.json())
            .subscribe(
                messages => this.messagesSubject.next(messages),
                (error: Response) => console.error(error)
            );
    }

    public sendMessage(message: ChatMessage): void {
        this.http
            .post('http://localhost:5000/api/chat', message)
            .map((res: Response) => res.json().location)
            .switchMap(this.getMessageById)
            .map((res: Response) => res.json())
            .subscribe(
                (message: ChatMessage) => this.sendMessageSubject.next(message),
                (error: Response) => console.error(error)
            )
        ;
    }

    private getMessageById = (location: string) => {
        return this.http.get('http://localhost:5000/' + location);
    }

}