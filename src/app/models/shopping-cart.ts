import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    $key: string;
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({...item, $key: productId}));
        }
    }

    getQuantity(product: Product){
        let item = this.itemsMap[product.$key];
        return item? item.quantity : 0;
      }

    get totalPrice(){
        let t=0;
        for(let id in this.items)
        {
            t += this.items[id].price * this.items[id].quantity;
        }
        return t;
    }


    get totalItemsCount() {
        let count=0;
        for(let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }

}