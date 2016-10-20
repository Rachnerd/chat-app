# Components
[Presentation slide](http://slides.com/rachnerd/deck-1#/3/41)
```
ng generate service chat/shared/chat
ng serve
```
#### 2.1 Provide the ChatService
```
Add ChatService to providers of AppModule.
```

#### 2.2 Implement sendMessage and getMessages
```
Inject Http into ChatComponent.
Create the 2 instance methods.
Both return an Observable, sendMessage: Observable<string>, getMessages: Observable<Array<ChatMessage>>
```

#### 2.3 Use both methods in ChatComponent
```
onSend calls sendMessage and appends the message to the messages
ngOnInit calls getMessages and sets its messages.
```

#### 2.4 Problems
onSend will push an incomplete message. The post request would return a location header, but due to the
current state of Angular 2 this isn't possible. Instead a json object {id: number} is returned.
```
Update the sendMessage stream so it:
- Returns type Observable<ChatMessage>
- Calls http.post which returns an Observable<Response>
- .map the response to the id (res.json().id)
- .switchMap to a getById call that calls /api/chat/:id
- .map that response to json to get the ChatMessage
```

#### 2.5 More problems!
The current setup feels pretty straightforward, but is the worst way of handling state. Let's fix getMessages
first.
```
Create a private instance member called messagesSubject of type Subject<Array<ChatMessage>>.
Init the messagesSubject in the constructor: this.messagesSubject = new Subject<Array<ChatMessage>>()
```
This subject will push data into the data stream

```
Create a public instance member called messages$ of type Observable<Array<ChatMessage>>.
Init the messages$ in the constructor: this.messages$ = this.messagesSubject.asObservable();
```

We hooked up the observable that will be exposed to the messagesSubject. The goal of this structure is to
expose chat messages without performing the Http request for every component/service that asks for it.

###### Why is this needed?
Imagine multiple components that need the ChatMessages. It would be a shame if they all
had to fetch them remotely.

###### Why don't just save the messages in the state of the ChatService?
Imagine 3 components using the ChatMessages.
If we fetch new data from the server, all 3 components need to be magically updated. Streams will solve this problem because
of observables. All components are listening to messages instead of asking for it.

```
Change the return type of getMessages to void and don't return the observable stream.
Subscribe the http.get stream in getMessages and emit the response (ChatMessages) through the messagesSubject.
(messages: Array<ChatMessage>) => this.messagesSubject.next(messages)
```

```
In ChatComponent subscribe messages$ instead of getMessages and call getMessages like any other void method.
```

We did it! Currently everybody with access to the ChatService can fetch new messages and listeners like ChatComponent
get updated automatically!

#### 2.6 sendMessages
```
Do the same for sendMessages.
- Create sendMessageSubject: Subject<ChatMessage>
- Create sendMessage$: Observable<ChatMessage>
- sendMessage: void
- ChatComponent subscribe to sendMessage$
- ChatComponent calls sendMessage onSend.
```

###### Even for posts?
Yes, now if ChatComponent submits a new message, all listeners also get notified!

###### This feels like a lot of overhead for something simple, is this necessary?
Yes, on a small scale it indeed feels like a lot of effort, but this style of data management scales very well. Complex state
can be made simple by implementing it like this.

###### Are there any alternatives to this?
Yes Redux (ngstore for Angular 2). This framework creates a single state
that makes state management even easier. Unfortunately Redux is out of scope for this workshop, but definitely
worth mentioning.

#### 2.7 Get rid of the hardcoded url by using provide.
We want to be able to configure the remote url once.
```
Create a file tokens.ts.
Fill the file with an opaque token:
import { OpaqueToken } from '@angular/core';
export let EXTERNAL_URL = new OpaqueToken('url.config');
```
url.config is just a name to make this an unique token.
```
Inject the EXTERNAL_URL as follows in ChatService.
@Inject(EXTERNAL_URL) url: string
Replace hardcoded urls with this.url + '/chat'.
```
Currently everything is set up but no url is provided.

```
Provide an url in the AppModule.
{
    provide: EXTERNAL_URL,
    useValue: 'https://rachnerd-angular2-chat.herokuapp.com/api'
}
```
If everything worked out, the url can be configured on root level.