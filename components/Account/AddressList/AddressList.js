import React, { useState, useEffect } from 'react';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function ListAddress() {
    const [addresses, setAddresses] = useState([]);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
            const result = await response.json();
            console.log(result);
        })();
    }, []);
    return (
        <div>
            
        </div>
    )
}
