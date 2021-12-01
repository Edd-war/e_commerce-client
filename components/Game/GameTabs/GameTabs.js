import React from 'react';
import { Tab } from 'semantic-ui-react';

export default function GameTabs(props) {
    const { game } = props;

    const panes = [
        {
            menuItem: 'Intofmación',
            render: () => (
                <Tab.Pane>
                    <h1>Info Game</h1>
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Comentarios',
            render: () => (
                <Tab.Pane>
                    <h1>Comentarios</h1>
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
