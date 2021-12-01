import React from 'react';
import ReactPlayer from 'react-player/lazy';


export default function GameInfo(props) {
    const { game } = props;

    return (
        <div className="game-info">
            <ReactPlayer 
                className="game-info__video" 
                url={game.video} 
                playing={false} 
                controls
            />
        </div>
    )
}
