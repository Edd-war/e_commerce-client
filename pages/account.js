import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getMeApi } from '../api/user';
import useAuth from '../hooks/useAuth';

export default function Account() {
    const [user, setUser] = useState(undefined);
    const {auth, logout} = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async() => {
            const response = await getMeApi(logout);
            setUser(response||{});
        })();
    }, [auth, logout]);

    if(user === undefined) return null;
    if(!auth){
        router.replace("/");
        return null;
    }
    // console.log(user);
    // console.log(auth);
    return (
        <BasicLayout className="account">
            <Configuracion />
        </BasicLayout>
    );
}

function Configuracion() {
    return (
        <BasicLayout className="account">
            <div className="account__configuration">
                <div className="title">Configuración</div>
                <div className="data">Formularios de configuración.</div>
            </div>
        </BasicLayout>
    );
}

