import React, { useEffect, useState } from 'react';
import { Grid, Image, Icon, Button, GridColumn } from 'semantic-ui-react';
import { size } from 'lodash';
import classNames from 'classnames';
import useAuth from '../../../hooks/useAuth';
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from '../../../api/favorite';

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
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const { auth, logout } = useAuth();
    // console.log(isFavorite);

    useEffect(() => {
        const fetchIsFavorite = async () => {
            const result = await isFavoriteApi(auth.idUser, game.id, logout);
            (size(result) > 0)
            ? setIsFavorite(true) 
            : setIsFavorite(false);
        };
        fetchIsFavorite();
        setIsFavorite(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game, reloadFavorite]); // si el juego cambia, se ejecuta la función de nuevo, para que se actualice el estado. ESTA ES LA PARTE SENSIBLE DEL USE EFFECT
    
    
    const addFavorite = async () => {
        if(auth){
            await addFavoriteApi(auth.idUser, game.id, logout);
            setReloadFavorite(true);
        }
    }

    const deleteFavorite = async () => {
        if(auth){
            await deleteFavoriteApi(auth.idUser, game.id, logout);
            setReloadFavorite(true);
        }
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
                    <p>Precio sugerido: $ {price}.00 MXN</p>
                    <div className="game-header__buy-price-actions">
                        <p>Descuento:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>{discount}%</p>
                        <p>Ahorras:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>$ {price * (discount / 100)}.00 MXN</p>
                    </div>
                </div>
                {/* Hasta este punto la siguiente línea sigue marcando warning, supongo que es por no definir la acción del boton, eso más adelante */}
                <Button className="game-header__buy-btn" onClick={null}>Adquirir por: $ {price - price * (discount / 100)}.00 MXN</Button>
            </div>
        </>
    );
}