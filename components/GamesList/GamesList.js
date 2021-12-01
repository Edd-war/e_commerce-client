import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';
import useWindowSize from '../../hooks/useWindowSize';
import { 
    breakpointUpSm,
    breakpointUpMd,
    breakpointUpLg,
    breakpointUpXl,
 } from '../../utils/breakpoint';

export default function GamesList(props) {
    const { games } = props;
    const { width } = useWindowSize();

    const getColumnsRender=() => {
        switch (true) {
            case width >= breakpointUpXl:
                return 5;
            case width > breakpointUpLg:
                return 4;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        }
    }

    return (
        <div className="games-list">
            <Grid>
                <Grid.Row columns={getColumnsRender()}>
                    {map(games, (game) => (
                        <Game game={game} />
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
}

function Game(props) {
    const { game } = props;
    // console.log(game.url);
    return (
        <Grid.Column className="games-list__game">
            <Link href={`/${game.url}`}>
                <a>
                    <div className="games-list__game-poster">
                        <Image src={game.poster.url} alt={game.title} />
                        <div className="games-list__game-poster-info">
                            {game.discount ? (
                                <span className="discount">-{game.discount}%</span>
                            ) : (
                                <span/>
                            )}
                            <span className="price">${game.price}</span>
                        </div>
                    </div>
                    <div className="games-list__game-title">{game.title}</div>
                </a>
            </Link>
        </Grid.Column>
    );
}