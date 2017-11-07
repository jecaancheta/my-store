import { Directive, AfterViewInit, Inject, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDatatable]'
})

export class DataTableDirective implements AfterViewInit {
    private el: any;

    constructor(ref: ElementRef) {
        this.el = ref.nativeElement;
    }

    ngAfterViewInit() {
        this.el.DataTable();
    }
}

