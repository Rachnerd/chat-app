import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChatMessage } from './chat-message.model';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { EXTERNAL_URL } from '../../tokens';

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
            .map((res: Response) => res.json())
            .subscribe(
                messages => this.messagesSubject.next(messages),
                (error: Response) => console.error(error)
            );
    }

    public sendMessage(message: ChatMessage): void {
        this.http
            .post(this.url, message)
            .map((res: Response) => res.json().id)
            .switchMap(this.getMessageById)
            .map((res: Response) => res.json())
            .subscribe(
                (message: ChatMessage) => this.sendMessageSubject.next(message),
                (error: Response) => console.error(error)
            )
        ;
    }

    private getMessageById = (id: string) => {
        return this.http.get(this.url + '/' + id);
    }

}