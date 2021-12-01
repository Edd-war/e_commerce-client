import React from 'react';
import ReactPlayer from 'react-player/lazy';
import moment from 'moment';
import "moment/locale/es";
import CarouselScreenshots from '../CarouselScreenshots';


export default function GameInfo(props) {
    const { game } = props;
    // console.log(game.screenshoots);

    return (
        <div className="game-info">
            <ReactPlayer 
                className="game-info__video" 
                url={game.video} 
                playing={false} 
                controls
            />
            <CarouselScreenshots 
                title={game.title} 
                screenshoots={game.screenshoots} 
            />
            <div className="game-info__content">
                <div dangerouslySetInnerHTML={{ __html: game.summary }} />
                <div className="game-info__content-date">
                    <h4>Fecha de Lanzamiento: </h4>
                    <p>{moment(game.releaseDate).format("LL")}</p>
                </div>
            </div>
        </div>
    );
}
