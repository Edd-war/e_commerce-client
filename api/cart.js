import { BASE_PATH, CART } from '../../config/constants';

export function getProductsCart () {
    const cart = localStorage(CART);

    if (!cart) {
        return [];
    } else {
        const products = cart.split(',');
        return products;
    }
}
