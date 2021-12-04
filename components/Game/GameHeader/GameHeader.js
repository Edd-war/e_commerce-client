import React, { useEffect, useState } from 'react';
import { Grid, Image, Icon, Button, GridColumn } from 'semantic-ui-react';
import { size } from 'lodash';
import classNames from 'classnames';
import useAuth from '../../../hooks/useAuth';
import { isFavoriteApi } from '../../../api/favorite';

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
    const [isFavorite, setIsFavorite] = useState(false);
    const { auth, logout } = useAuth();
    console.log(isFavorite);

    useEffect(() => {
        const fetchIsFavorite = async () => {
            const result = await isFavoriteApi(auth.idUser, game.id, logout);
            (size(result) > 0)
            ? setIsFavorite(true) 
            : setIsFavorite(false);
        };
        fetchIsFavorite();
    }, [game.id]); // si el juego cambia, se ejecuta la función de nuevo, para que se actualice el estado. ESTA ES LA PARTE SENSIBLE DEL USE EFFECT
    
    
    const addFavorite = () => {
        console.log('Añadir a favoritos');
    }

    const deleteFavorite = () => {
        console.log('Eliminar de favoritos');
    }
    
    return (
        <>
            <div className="game-header__title">
                <h1>{title}</h1>
                <Icon 
                    name={
                        isFavorite 
                            ? "heart" 
                            : "heart outline"
                    } 
                    className={classNames({
                        like: isFavorite,
                    })}
                    link 
                    onClick={
                        isFavorite 
                            ? deleteFavorite 
                            : addFavorite
                    }
                />
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
                        <p>Descuento:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/> {discount}%</p>
                        <p>Ahorras:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>${(price * discount / 100)}</p>
                    </div>
                </div>
                {/* Hasta este punto la siguiente línea sigue marcando warning, supongo que es por no definir la acción del boton, eso más adelante */}
                <Button className="game-header__buy-btn" onClick={null}>Adquirir por: $ {price - price * (discount / 100)}.00 MXN</Button>
            </div>
        </>
    );
}