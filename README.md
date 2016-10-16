# Workshop
```
ng generate module chat
ng generate component chat/chat-list
ng generate component chat/chat-form
ng serve
```

#### 1.1 Connecting the modules
The AppModule is currently not aware of the ChatModule.
```
Add ChatModule to the imports of AppModule.
```

#### 1.2 Exposing ChatComponent
ChatModule is not exposing any components.
```
Add ChatComponent to the exports of ChatModule.
```
```javascript
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ChatComponent],
    declarations: [ChatComponent, ChatListComponent, ChatFormComponent]
})
```
#### 1.3 Visualizing ChatComponent
```
<ws-chat></ws-chat>
```
The selector above is now available throughout the application.
```
Replace the content of AppComponent's template with a ChatComponent.
```
Before we continue test the application.
```
ng test
```
It seems that the change to AppComponent's template broke the unit tests.
```
app.component.spec.ts
Add ChatComponent, ChatComponentList, ChatComponentForm to the declarations of the TestBed.
Remove the unit tests checking for the title and h1 element.
```