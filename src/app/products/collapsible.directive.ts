import { Component, Input } from '@angular/core';
import { ICategory } from './../shared/category';
import { IProduct } from './../shared/product';

@Component({
    selector: 'app-product-collapsible',
    template: `
        <div>
            <div collapsible-title class="row category">
                <div class="col">
                    {{ item.name }}
                </div>
                <div class="col">
                    {{ getTotalStocks() }}
                </div>
                <div class="col">
                    <span [ngClass]="getCollapsibleIcon()" (click)="toggleContent()"></span>
                </div>
            </div>
        </div>
        <div *ngIf="visible">
            <div *ngFor="let product of itemProducts">
                <div class="col">
                    {{ product.name }}
                </div>
                <div class="col">
                    {{ product.price | currency }}
                </div>
                <div class="col">
                    {{ product.stocks }}
                </div>
            </div>
        </div>
    `
})

export class CollapsibleComponent {
    @Input() item: ICategory;
    @Input() itemProducts: IProduct[];
    visible: Boolean = true;

    toggleContent() {
        this.visible = !this.visible;
    }

    getCollapsibleIcon() {
        if (this.visible) {
            return ['fa', 'fa-chevron-down'];
        }

        return ['fa', 'fa-chevron-up'];
    }

    getTotalStocks() {
        let total = 0;
        this.itemProducts.forEach(function(itemProduct) {
            total += itemProduct.stocks;
        });
        return total;
    }
}
