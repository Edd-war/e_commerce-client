import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../../layouts/BasicLayout';
import { getGamesPlatformApi } from '../../api/game';

const limitPerPage = 10;

export default function Platform() {
    const { query } = useRouter();
    // console.log(router);

    const [games, setGames] = useState(null);

    useEffect(() => {
        (async() => {
            const response = await getGamesPlatformApi(
                query.platform, 
                limitPerPage, 
                0
            );
            // console.log(response);
            setGames(response);
        })();
    }, [query]);

    return (
        <BasicLayout className="platform">
            <h1>Estás en la plataforma: {query.platform}</h1>
        </BasicLayout>
    );
}
