import { Component, Input } from '@angular/core';
import { ICategory } from './../shared/category';
import { IProduct } from './../shared/product';

@Component({
    selector: 'product-collapsible',
    templateUrl: './collapsible.component.html',
    styleUrls: ['./collapsible.component.css']
})

export class CollapsibleComponent {
    @Input() item: ICategory;
    @Input() itemProducts: IProduct[];
    visible: Boolean = true;

    toggleContent() {
        this.visible = !this.visible;
    }

    areProductsVisible() {
        return this.visible && (this.itemProducts != null && this.itemProducts.length > 0);
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
