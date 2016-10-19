# Routing
[Presentation slide](http://slides.com/rachnerd/deck-1#/3/50)
```
ng generate component home
```
####4.1 WsChatAppRoutingModule
```
Add WsChatAppRoutingModule to the imports of AppModule.
```
####4.2 Configure route
```
Hook up ChatComponent to the '' path in app-routing.module.
{
    path: '',
    component: ChatComponent
}
```
####4.3 Display the result
```
Replace app.component.html with <router-outlet></router-outlet>
```

The chat should be back now. Nothing visual changed because we currently have 1 router-outlet.

####4.4 Other outlets
```
Create a gridlayout in app.component.html using Angular material 2.
Make sure there are at least 2 reserved spaces.
in app.component.html
<md-grid-list cols="4">
    <md-grid-tile colspan="3">One</md-grid-tile>
    <md-grid-tile rowspan="2">Two</md-grid-tile>
    <md-grid-tile colspan="3">Three</md-grid-tile>
</md-grid-list>
in app.component.scss
md-grid-tile {
  box-sizing: border-box;
  border: 1px solid black;
}

ws-chat {
  width: 100%;
  height: 100%;
}
```

```
Replace the content of one md-grid-tile with router-outlet and the others with a named outlet.
```

####