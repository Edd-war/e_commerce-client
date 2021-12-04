import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { searchGamesApi } from '../api/game';
import { size } from 'lodash';

export default function Search() {

    const [games, setGames] = useState(null);
    const { q } = useRouter().query;
    console.log(q);

    useEffect(() => {
        document.getElementById('search-game').focus();
    }, []);

    useEffect(() => {
        const fetchSearchGames = async () => {
            if(size(q) > 0) {
                const { data } = await searchGamesApi(q);
                if(size(data) > 0) {
                    setGames(data);
                } else {
                    setGames(null);
                }
            }
        };
        fetchSearchGames();
    }, [q]);

    return (
        <BasicLayout>
            <h1>Search</h1>
        </BasicLayout>
    );
}
