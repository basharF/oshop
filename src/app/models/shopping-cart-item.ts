import { Product } from "./product";

export class ShoppingCartItem{
    $key: string;
    title: string;
    price: number;
    category: string;
    quantity: number;
    imageUrl: string;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice(){
        return this.price * this.quantity;
    }
}