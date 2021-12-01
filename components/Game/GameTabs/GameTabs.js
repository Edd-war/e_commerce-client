import React from 'react';
import { Tab } from 'semantic-ui-react';
import GameInfo from '../GameInfo';

export default function GameTabs(props) {
    const { game } = props;

    const panes = [
        {
            menuItem: 'Intofmación',
            render: () => (
                <Tab.Pane>
                    <GameInfo game={game} />
                </Tab.Pane>
            )
        },
    ];

    return (
        <Tab 
            className="game-tabs" 
            menu={{ secondary: true, pointing: true}} 
            panes={panes} />
    )
}
