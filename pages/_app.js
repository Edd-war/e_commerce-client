import React, { useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { setToken } from '../api/token';
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {

    const [auth, setAuth] = useState(undefined);
    console.log(auth);

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


    const authData = useMemo(
        () => ({
            auth,
            login,
            logout: () => {},
            setReloadUser: () => {}
        }),
        []
    );

    return (
        <AuthContext.Provider value={authData}>
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
        </AuthContext.Provider>
    );
}