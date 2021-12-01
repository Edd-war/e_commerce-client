import React from 'react';
import ReactPlayer from 'react-player/lazy';
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
        </div>
    )
}
