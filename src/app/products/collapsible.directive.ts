import { Component, Input } from '@angular/core';
import { ICategory } from './../shared/category';
import { IProduct } from './../shared/product';

@Component({
    selector: 'app-product-collapsible',
    templateUrl: 'collapsible.html'
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
