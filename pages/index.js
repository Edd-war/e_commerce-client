import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";
import GamesList from "../components/GamesList";
import Seo from "../components/Seo";

export default function Home() {
    const [games, setGames] = useState(null);
    // console.log(games);

    useEffect(() => {
        (async () => {
            const response = await getLastGamesApi(50);
            if(size(response) > 0) {
                setGames(response);
            } else {
                setGames(null);
            }
        })();
    }, []);

    return ( 
        <BasicLayout className="home">
            <Seo title="Start to Game" />
            {!games && <Loader active>Cargando...</Loader>}
            {games && size(games) === 0 && (
                <div className="no-games">
                    <h3>No hay juegos</h3>
                </div>
            )}
            {size(games) > 0 && <GamesList games={games} />}
        </BasicLayout>
    );
}