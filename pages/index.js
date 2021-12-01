import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";
import { size } from "lodash";

export default function Home() {
    const [games, setGames] = useState(null);
    console.log(games);

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
            <h1>Estamos en la HOME</h1>
            <h2>Hola Mundo</h2>
        </BasicLayout>
    );
}