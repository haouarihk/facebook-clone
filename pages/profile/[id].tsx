import { Avatar } from '@material-ui/core';

import React from 'react'
import { useEffect } from 'react'
import { getUser } from 'src/firebase/firestore'

import styles from "./id.module.scss"

const defaultUser = {
    name: "wait",
    avatarUrl: "",
    bannerUrl: "",
}

export default function profile() {
    const [user, setUser] = React.useState(defaultUser)
    useEffect(() => {
        // get id
        const id = window.location.pathname.split('/')[2]
        console.log('profile')

        // get user from firestore
        getUser(id).then(setUser)

    }, []);
    return (
        <div className={styles.body}>
            <div className={styles.banner}>

            </div>
            <Avatar className={styles.avatar} src={user.avatarUrl} />
            <div className={styles.name}>
                {user.name}
            </div>
        </div>
    )
}
