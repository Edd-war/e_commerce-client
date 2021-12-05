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

export function countProductsCart () {
    const cart = getProductsCart();
     if(!cart){
        return 0;
     } else {
        return size(cart);
     }
}

export function removeProductCart (product) {
    const cart = getProductsCart();
    
    const productFound = includes(cart, product);
    if(productFound){
        remove(cart, (item) => {
            return item === product;
        });
        localStorage.removeItem(CART);
        localStorage.setItem(CART, cart);
        toast.success('Producto eliminado del carrito');
    } else {
        toast.warning('El producto no esta en el carrito');
    }

    if(size(cart) === 0){
        localStorage.removeItem(CART);
    }
}
