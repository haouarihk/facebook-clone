import React from 'react';
import { useEffect } from 'react';
import styles from './index.module.scss';
import Options from './options';

import { navbarStore } from "../../state/store";

const unsubNav = navbarStore.subscribe(() => {
    const { selected } = navbarStore.getState();
    console.log("updated", selected);
    pageState[1](selected);
});


const setPage = (selected: string) => {
    navbarStore.dispatch({
        type: 'SET_NAVBAR',
        payload: { selected }
    })
}


let pageState: any = [0, (a: string) => { }];
export default function Navbar({ currentPage }: { currentPage: string }) {
    pageState = React.useState(currentPage);


    return (
        <nav className={styles.navbar}>
            <img className={styles.logo} src={"https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"} />
            <div className={styles.search}>search engine</div>
            <Options selected={pageState[0]} onChange={setPage} />
        </nav>
    );
};

// add style 
