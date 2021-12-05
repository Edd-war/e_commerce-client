import React, { useEffect, useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { map, size } from 'lodash';
import link from 'next/link';
import classNames from 'classnames';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressShipping() {
    const { auth, logout} = useAuth();

    const [address, setAddress] = useState(null);

    useEffect(() => {
        (async() => {
            const response = await getAddressesApi(auth.idUser, logout);
            // console.log(await response.json());
            setAddress(await response.json() || []);
         })();
    }, []);


    return (
        <div>
            
        </div>
    );
}
