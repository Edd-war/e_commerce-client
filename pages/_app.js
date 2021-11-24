import React, { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
    const authData = useMemo(
        () => ({
            auth: {
                name: "Eduardo",
                email: "digiespirit@hotmail.com"
            },
            login: () => {},
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