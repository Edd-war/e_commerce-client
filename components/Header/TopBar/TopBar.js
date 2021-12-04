import React, { useEffect, useState } from 'react';
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function TopBar() {
    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Column width={8} className="top-bar__left">
                        <Logo />
                    </Grid.Column>
                    <Grid.Column width={8} className="top-bar__right">
                        <Search />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

function Logo(){
    return (
        <Link href="/">
            <a>
                <Image src="/logo.png" alt="Gaming" />
            </a>
        </Link>
    );
}


function Search() {
    const [searchStr, setSearchStr] = useState("");
    const router = useRouter();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (load) {
            router.push(`/search?q=${searchStr}`);
        }
        setLoad(true);
    }, [searchStr]);

    // console.log(router.query.q);


    return (
        <Input
            id="search-game"
            icon={{name:"search"}}
            value={router.query.q}
            onChange={(_, data) => setSearchStr(data.value)}
        />
    );
}