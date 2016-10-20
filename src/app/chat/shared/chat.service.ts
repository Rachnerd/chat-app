import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChatMessage } from './chat-message.model';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { EXTERNAL_URL } from '../../tokens';
import { json, logError } from '../../shared/utils';

@Injectable()
export class ChatService {
    public messages$: Observable<Array<ChatMessage>>;
    private messagesSubject: Subject<Array<ChatMessage>> = new Subject<Array<ChatMessage>>();

    public sendMessage$: Observable<ChatMessage>;
    private sendMessageSubject: Subject<ChatMessage> = new Subject<ChatMessage>();
    private url: string;

    constructor(@Inject(EXTERNAL_URL) url: string, private http: Http) {
        this.messages$ = this.messagesSubject.asObservable();
        this.sendMessage$ = this.sendMessageSubject.asObservable();
        this.url = url + '/chat';
    }

    public fetchMessages(): void {
        this.http
            .get(this.url)
            .map(json)
            .subscribe(this.nextMessages, logError);
    }

    public sendMessage(message: ChatMessage): void {
        this.postMessage(message)
            .switchMap(this.getMessageById)
            .subscribe(this.nextSendMessage, logError)
        ;
    }
    private nextMessages = (messages: Array<ChatMessage>): void  => {
        this.messagesSubject.next(messages);
    };

    private postMessage = (message: ChatMessage): Observable<string> => {
        return this.http
            .post(this.url, message)
            .map(json)
            .map(this.toId);
    };

    private toId = (obj: {id: string}): string => {
        return obj.id;
    };

    private getMessageById = (id: string): Observable<string> => {
        return this.http.get(this.url + '/' + id)
            .map(json);
    };

    private nextSendMessage = (message: ChatMessage): void => {
        this.sendMessageSubject.next(message);
    };
}