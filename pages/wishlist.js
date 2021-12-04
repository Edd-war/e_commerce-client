import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getFavoritesApi } from '../api/favorite';
import useAuth from '../hooks/useAuth';

export default function WishList() {
    const [games, setGames] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response=await getFavoritesApi(auth.idUser, logout);
            // console.log(response);
            setGames(response);
         })();
    }, []);

    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="wishlist__block-title">
                    <h2>Wishlist</h2>
                </div>
                <div className="wishlist__block-content">
                    <p>Lista de Juegos</p>
                </div>
            </div>
        </BasicLayout>
    );
}
