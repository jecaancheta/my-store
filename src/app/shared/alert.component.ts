import { Component, Input } from '@angular/core';

@Component({
    selector: 'alert',
    template: `
        <div *ngIf="visible" class="alert fade show" [ngClass]="[alertClass]" role="alert">
            <strong>{{ title }}</strong> {{ message }}
        </div>
    `
})

export class AlertComponent {
    @Input() title: String;
    @Input() message: String;
    @Input() visible: Boolean = true;
    @Input() alertClass: String = '';
}
