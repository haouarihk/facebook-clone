import { Avatar } from '@material-ui/core'
import { Public } from '@material-ui/icons'
import React, { useContext, useEffect } from 'react'
import { UserContext } from 'src/contexts/userProvider'
import { UsersCacheContext } from 'src/contexts/usersCacheProvider'
import { FUser } from 'src/firebase/firestore'
import styles from "./index.module.scss"

const defaultUser = {
    name: "guest",
    avatar: null,
}

export default function User({ userId, data, stats, onlyAvatar }: { userId?: string, data?: any, stats?: { hm?: string, stat?: string, isPublic?: boolean }, onlyAvatar?: boolean }) {
    const { users, updateUser } = useContext(UsersCacheContext)
    const me = useContext(UserContext)
    const [user, setUser] = React.useState(data || defaultUser);

    useEffect(() => {
        if (!me.user) return
        if (data) return

        const uid = userId == "me" ? me.user.uid : userId;
        if (!uid) return console.warn("User id is required");

        if (users[uid])
            return setUser(users[uid])


        if (userId == "me") {
            // if the user is not logged in
            if (!me.user)
                // set user to null
                return setUser(defaultUser);


            // set user to logged user
            setUser(me.user);

            // updates the user in the cache and retriving the data from firestore
            console.log("check", me.user)
            updateUser(uid).then(setUser).catch(() => setUser(me.user))

        } else
            // updates the user in the cache and retriving the data from firestore
            updateUser(uid).then(setUser).catch(() => setUser(defaultUser))

    }, [me.user, userId])


    return (user ? <div className={styles.body}>
        <div className={styles.avatar}>
            <Avatar src={user.avatarUrl || user.photoURL} />
        </div>
        {!onlyAvatar &&
            <div className={styles.content}>
                <div className={styles.ok}>
                    <div className={styles.name}>{user.name || user.displayName}</div>
                    <div className={styles.stat}>{stats ? stats.stat ? stats.stat : "" : ""}</div>
                </div>

                <div className={styles.addition}>{stats ? stats.hm ? stats.hm : "" : ""} {stats?.isPublic ? <Public /> : ""}</div>
            </div>
        }
    </div>
        :
        <div className={styles.body}>not logged in</div>
    )
}
