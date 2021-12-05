import React, { useState, useMemo, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { setToken, getToken, removeToken } from '../api/token';
import { 
    getProductsCart, 
    addProductCart, 
    countProductsCart,
    removeProductCart,
} from '../api/cart';
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {

    const [auth, setAuth] = useState(undefined);
    const [reloadUser, setReloadUser] = useState(false);
    const [totalProdcuctsCart, setTotalProdcuctsCart] = useState(0);
    const [reloadCart, setReloadCart] = useState(false);
    const router = useRouter();
    // console.log(auth);

    useEffect(() => {
        const token = getToken();
        // console.log(token);
        if (token) {
            setAuth({
                token,
                idUser: jwtDecode(token).id,
            });
        }else{
            setAuth(null);
        }
        setReloadUser(false);
    }, [reloadUser]);

    const login = (token) => {
        setToken(token);
        // console.log("Estamos en App.js");
        // console.log(token);
        // console.log(jwtDecode(token));
        setAuth({
            token,
            idUser: jwtDecode(token).id,
        });
    }

    const logout = () => {
        if (auth) {
            removeToken();
            setAuth(null);
            router.push('/');
        }
    }

    const authData = useMemo(
        () => ({
            auth,
            login,
            logout,
            setReloadUser
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [auth]
    );

    useEffect(() => {
        setTotalProdcuctsCart(countProductsCart());
        setReloadCart(false);
    }, [reloadCart, auth]);


    const addProdcuct = (product) => {
        const token = getToken();
        if(token){
            addProductCart(product);
            setReloadCart(true);
        }else{
            toast.warning("Debes iniciar sesión para agregar productos al carrito");
        }
    }
    
    const removeProduct = (product) => {
        const token = getToken();
        if(token){
            removeProductCart(product);
            setReloadCart(true);
        }else{
            toast.warning("Debes iniciar sesión para agregar productos al carrito");
        }
    }

    const cartData = useMemo(
        () => ({
            productsCart: totalProdcuctsCart,
            addProductCart: (product) => addProdcuct(product),
            getProductsCart: getProductsCart,
            removeProductCart: (product) => removeProduct(product),
            removeAllProdcutsCart: () => {},
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [totalProdcuctsCart]
    );


    if(auth===undefined) return null;

    return (
        <AuthContext.Provider value={authData}>
            <CartContext.Provider value={cartData}>
                <Component {...pageProps } />
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </CartContext.Provider>
        </AuthContext.Provider>
    );
}