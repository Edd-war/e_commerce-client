import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getMeApi } from '../api/user';
import useAuth from '../hooks/useAuth';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm/ChangePasswordForm';
import BasicModal from '../components/Modal/BasicModal';

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
            <Configuracion 
                user={user} 
                logout={logout} 
                setReloadUser={setReloadUser} 
            />
            <Addresses />
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

function Addresses(){
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);

    const openModal = (title) => {
        setShowModal(true);
        setTitleModal(title);
        setFormModal(<h1>NUEVA DIRECCIÓN</h1>); //SE PROGRAMARÁ ESTO EN EL PRÓXIMO COMMIT
    }


    return (
        <div className="account__addresses">
            <div className="title">
                Direcciones
                <Icon name="plus" link onClick={() => openModal("Agregar Dirección")} />
            </div>
            <div className="data">
                <p>Lista de direcciones</p>
            </div>

            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                <p>Formulario Add - Update</p>
            </BasicModal>

        </div>
    );
}