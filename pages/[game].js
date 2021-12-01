import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import GameHeader from '../components/Game/GameHeader/GameHeader';

export default function Game() {
    const [game, setGame] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        (async() => {
            const response = await getGameByUrlApi(query.game);
            // const { data } = resposnse;
            setGame(response[0]);
            // console.log(response[0]);
        })()
    }, [query]);

    if(!game) return null;

    return (
        <BasicLayout className="game">
            <GameHeader game={game} />
        </BasicLayout>
    );
}
