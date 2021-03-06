import React, { useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping';
import Payment from '../components/Cart/Payment';


export default function Cart() {
    const { getProductsCart, removeProductCart, updateProductCart } = useCart();
    const products = getProductsCart();

    return !products 
        ? <EmptyCart />
        : <NotEmptyCart products={products} />
}

function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h1>Carrito vacio</h1>
        </BasicLayout>
    );
}

function NotEmptyCart(props) {
    const { products } = props;
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);
    // console.log(productsData);
    // console.log(address);

    useEffect(() => {
        (async()=> {
            const productsTemp = [];
            for await (const product of products) {
                const data = await getGameByUrlApi(product);
                productsTemp.push(data);
            }
            setProductsData(productsTemp);
        })();
        setReloadCart(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadCart]);

    return (
        <BasicLayout className="empty-cart">
            <SummaryCart 
                products={productsData} 
                reloadCart={reloadCart}
                setReloadCart={setReloadCart}    
            />
            <AddressShipping setAddress={setAddress} />
            {address && <Payment products={productsData} address={address} />}
        </BasicLayout>
    );
}