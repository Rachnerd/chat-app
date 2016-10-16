/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ChatFormComponent } from './chat-form.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

describe('Component: ChatForm', () => {
    let chatFormComponent: ChatFormComponent;
    let fixture: ComponentFixture<ChatFormComponent>;
    let chatFormElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChatFormComponent
            ],
        });
        fixture = TestBed.createComponent(ChatFormComponent);
        chatFormComponent = fixture.debugElement.componentInstance;
        chatFormElement = fixture.debugElement;
    });

    it('should clear the input on submit', async(() => {
        let inputElement = chatFormElement.query(By.css('input')).nativeElement;
        let formDebugElement = chatFormElement.query(By.css('form'));
        inputElement.value = 'test';
        formDebugElement.triggerEventHandler('ngSubmit', inputElement);
        fixture.detectChanges();
        expect(inputElement.value).toEqual('');
    }));
    it('should emit the send event containing the input value on submit', async(() => {
        let inputElement = chatFormElement.query(By.css('input')).nativeElement;
        let formDebugElement = chatFormElement.query(By.css('form'));
        const sendSpy = createSpy('sendSpy');
        inputElement.value =  'test';
        chatFormComponent.send.subscribe(sendSpy);
        formDebugElement.triggerEventHandler('ngSubmit', inputElement);
        expect(sendSpy).toHaveBeenCalledWith('test');
    }));
});
