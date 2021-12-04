import { toast } from 'react-toastify';
import { size, includes, remove } from 'lodash';
import { BASE_PATH, CART } from '../utils/constants';

export function getProductsCart () {
    const cart = localStorage.getItem(CART);

    if (!cart) {
        return [];
    } else {
        const products = cart.split(',');
        return products;
    }
}

export function addProductCart (product) {
    const cart = getProductsCart();

    if(!cart){
        localStorage.setItem(CART, product);
        toast.success('Producto agregado al carrito');
    } else {
        const productFound = includes(cart, product);
        if(productFound){
            toast.warning('El producto ya esta en el carrito');
        } else {
            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success('Producto agregado al carrito');
        }
    }
}