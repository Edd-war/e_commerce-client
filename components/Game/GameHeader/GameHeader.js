import React from 'react';
import { Grid, Image, Icon, Button, GridColumn } from 'semantic-ui-react';
import { size } from 'lodash';

export default function GameHeader(props) {
    const { game } = props;
    const { poster, title } = game;
    // console.log(title);

    return (
        <Grid className="game-header">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={poster.url} alt={title} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info game={game} />
            </Grid.Column>
        </Grid>
    );
}

function Info (props) {
    const { game } = props;
    const { title, summary, price, discount } = game;
    // console.log(title);

    return (
        <>
            <div className="game-header__title">
                <h1>{title}</h1>
                <Icon name="heart outline" link />
            </div>
            <div className="game-header__delivery">Entrega de 24 a 48 horas</div>
            <div 
                className="game-header__summary" 
                dangerouslySetInnerHTML={{__html: summary}}
            />
            <div className="game-header__buy">
                <div className="game-header__buy-price">
                    <p>Precio: ${price}</p>
                    <div className="game-header__buy-price-actions">
                        <p>Descuento: {discount}%</p>
                        <p>Ahorras: ${(price * discount / 100)}</p>
                    </div>
                </div>
                <Button className="game-header__buy-btn">Comprar por: ${price - (price * discount / 100)}</Button>
            </div>
        </>
    );
}