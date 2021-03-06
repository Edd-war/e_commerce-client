import React, { useEffect, useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { map, size } from 'lodash';
import Link from 'next/link';
import classNames from 'classnames';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressShipping(props) {
    const { address, setAddress } = props;
    const { auth, logout} = useAuth();

    const [addressActive, setAddressActive] = useState(null);
    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        (async() => {
            const response = await getAddressesApi(auth.idUser, logout);
            // console.log(await response.json());
            setAddresses(await response.json() || []);
         })();
    }, []);


    return (
        <div className="address-shipping">
            <div className="title">Dirección de Envío</div>
            <div className="data">
                {size(addresses) === 0 ? (
                    <h3>
                        No tienes direcciones registradas {" "}
                        <Link href="/account">
                            <a>Agregar nueva dirección</a>
                        </Link>
                    </h3>
                ) : (
                    <Grid>
                        {map(addresses, (address) => (
                            <Grid.Column 
                                key={address.id}
                                mobile={16}
                                tablet={8}
                                computer={4}
                            >
                                <Address address={address} addressActive={addressActive} setAddressActive={setAddressActive} setAddress={setAddress} />
                            </Grid.Column>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    );
}

function Address(props){
    const { address, addressActive, setAddressActive, setAddress } = props;

    const changeAddress = () => {
        setAddressActive(address._id);
        setAddress(address);
    }

    return (
        <div 
          className={
              classNames(
                  "address", 
                  {active:addressActive === address._id}
              )
          }
          onClick={changeAddress}
        >
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.state}, {address.zip}</p>
            <p>{address.phone}</p>
        </div>
    );
}
