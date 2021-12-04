import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { searchGamesApi } from '../api/game';
import GamesList from '../components/GamesList';

export default function Search() {

    const [games, setGames] = useState(null);
    const { q } = useRouter().query;
    // console.log(q);

    useEffect(() => {
        document.getElementById('search-game').focus();
    }, []);

    useEffect(() => {
        const fetchSearchGames = async () => {
            if(size(q) > 0) {
                const data = await searchGamesApi(q);
                if(size(data) > 0) {
                    // console.log(data);
                    setGames(data);
                } else {
                    setGames(null);
                }
            }
        };
        fetchSearchGames();
    }, [q]);

    return (
        <BasicLayout className="search">
            {!games && <Loader active inline='centered' />}
            {games && size(games) === 0 &&(
                <div>
                    <h3>No results found</h3>
                </div>
            )}
            {games && size(games) > 0 && (
                <GamesList games={games} />
            )}
        </BasicLayout>
    );
}
