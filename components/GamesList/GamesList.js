import React from 'react';
import { map } from 'lodash';

export default function GamesList(props) {
    const { games, onGameClick } = props;

    return (
        <div className="games-list">
            {map(games, (game, index) => (
                <h3>{game.title}</h3>
            ))}
        </div>
    )
}
