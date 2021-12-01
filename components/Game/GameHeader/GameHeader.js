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
        </Grid>
    );
}
