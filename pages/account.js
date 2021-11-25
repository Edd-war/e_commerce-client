import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getMeApi } from '../api/user';
import useAuth from '../hooks/useAuth';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm/ChangePasswordForm';

export default function Account() {
    const [user, setUser] = useState(undefined);
    const {auth, logout, setReloadUser} = useAuth();
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
            <Configuracion user={user} logout={logout} setReloadUser={setReloadUser} />
        </BasicLayout>
    );
}

function Configuracion(props) {
    const {user, logout, setReloadUser} = props;
    return (
        <div className="account__configuration">
            <div className="title">Configuración</div>
            <div className="data">
                <ChangeNameForm 
                  user={user} 
                  logout={logout} 
                  setReloadUser={setReloadUser}
                />
                <ChangeEmailForm 
                  user={user} 
                  logout={logout} 
                  setReloadUser={setReloadUser}
                />
                <ChangePasswordForm
                  user={user}
                  logout={logout}
                  // setReloadUser={setReloadUser} NO SE PUEDE PONER PORQUE NO SE PUEDE HACER UN SETSTATE EN UN COMPONENTE HIJO DE UN COMPONENTE HIJO
                />
            </div>
        </div>
    );
}

