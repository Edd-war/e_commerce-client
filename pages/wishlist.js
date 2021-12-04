import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react'
import { size, forEach } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getFavoritesApi } from '../api/favorite';
import useAuth from '../hooks/useAuth';
import GameList from '../components/GamesList';

export default function WishList() {
    const [games, setGames] = useState(null);
    const { auth, logout } = useAuth();

    console.log(games);

    useEffect(() => {
        const fetchFavorites = async () => {
            const response=await getFavoritesApi(auth.idUser, logout);
            console.log(response);
            // setGames(response);
            if(size(response)>0){
                const gamesList=[];
                forEach(response, (data)=>{
                    // console.log(data);
                    gamesList.push(data.game);
                });
                setGames(gamesList);
                console.log(gamesList);
            } else {
                setGames([]);
            }
         };
        fetchFavorites();
    }, []);

    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="wishlist__block-title">
                    <h2>Wishlist</h2>
                </div>
                <div className="wishlist__block-content">
                    {!games && <Loader active>Cargando...</Loader>}
                    {games && size(games) === 0 && (
                        <div className="data__not-found">
                            <h3>No hay juegos en tu wishlist</h3>
                        </div>
                    )}
                    {games && size(games) > 0 && (
                        <GameList games={games} />
                    )}
                </div>
            </div>
        </BasicLayout>
    );
}
