import React, { useState, useMemo, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { setToken, getToken } from '../api/token';
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {

    const [auth, setAuth] = useState(undefined);
    const [reloadUser, setReloadUser] = useState(false);
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


    const authData = useMemo(
        () => ({
            auth,
            login,
            logout: () => {},
            setReloadUser
        }),
        [auth]
    );

    if(auth===undefined) return null;

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