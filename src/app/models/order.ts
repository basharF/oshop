import { ShoppingCart } from './shopping-cart';
export class Order{
    datePlaced;
    items= [];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    price: i.price,
                    imageUrl: i.imageUrl
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });
    }
}