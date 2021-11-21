import { Button, Icon } from 'semantic-ui-react'


export default function Home() {
    return ( 
        <div>
            <h1>Estamos en Next Js</h1>

            <Button primary>Primary</Button>
            <Button secondary>Secondary</Button>
            <Icon name='home' />
        </div>
    );
}