import { Avatar } from '@material-ui/core'
import { Public } from '@material-ui/icons'
import React, { useContext, useEffect } from 'react'
import { UsersCacheContext } from 'src/contexts/usersCacheProvider'
import { getUser } from 'src/firebase/firestore'
import styles from "./index.module.scss"

const defaultUser = {
    name: "loading",
    avatar: null,
}

export default function User({ userId, data, stats, onlyAvatar }: { userId?: string, data?: any, stats?: { hm?: string, stat?: string, isPublic?: boolean }, onlyAvatar?: boolean }) {
    const { users, updateUser } = useContext(UsersCacheContext)
    const [user, setUser] = React.useState(data || defaultUser);
    useEffect(() => {
        if (data) return
        if (!userId) return console.error("User id is required")

        if (users[userId])
            return setUser(users[userId]);


        getUser(userId).then(setUser)
    }, [])



    return (
        <div className={styles.body}>
            <div className={styles.avatar}>
                <Avatar src={user.avatarUrl} />
            </div>
            {!onlyAvatar &&
                <div className={styles.content}>
                    <div className={styles.ok}>
                        <div className={styles.name}>{user.name}</div>
                        <div className={styles.stat}>{stats ? stats.stat ? stats.stat : "" : ""}</div>
                    </div>

                    <div className={styles.addition}>{stats ? stats.hm ? stats.hm : "" : ""} {stats?.isPublic ? <Public /> : ""}</div>
                </div>
            }
        </div>
    )
}
