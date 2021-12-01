import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { getGamesPlatformApi } from '../../api/game';
import GamesList from '../../components/GamesList';

const limitPerPage = 10;

export default function Platform() {
    const { query } = useRouter();
    // console.log(router);

    const [games, setGames] = useState(null);

    useEffect(() => {
        (async() => {
            if(query.platform) {
                const response = await getGamesPlatformApi(
                    query.platform, 
                    limitPerPage, 
                    0
                );
                // console.log(response);
                setGames(response);
            }
        })();
    }, [query]);

    return (
        <BasicLayout className="platform">
            {!games && <Loader active>Cargando...</Loader>}
            {games && size(games) === 0 && (
                <div className="no-results">
                    No se encontraron resultados
                </div>
            )}
            {games && size(games) > 0 && (
                <GamesList games={games} />
            )}
        </BasicLayout>
    );
}
