import { Avatar } from '@material-ui/core'
import { Public } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { getUser } from 'src/firebase/firestore'
import styles from "./index.module.scss"

const defaultUser = {
    name: "loading",
    avatar: null,
}

export default function User({ userId, data, stats }: { userId?: string, data?: any, stats?: { hm?: string, stat?: string, isPublic?: boolean } }) {
    const [user, setUser] = React.useState(data || defaultUser)
    useEffect(() => {
        if (data) return
        if (userId)
            getUser(userId).then(setUser)
    }, [])



    return (
        <div className={styles.body}>
            <div className={styles.avatar}>
                <Avatar src={user.avatarUrl} />
            </div>
            <div className={styles.content}>
                <div className={styles.ok}>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.stat}>{stats ? stats.stat ? stats.stat : "" : ""}</div>
                </div>

                <div className={styles.addition}>{stats ? stats.hm ? stats.hm : "" : ""} {stats?.isPublic ? <Public /> : ""}</div>
            </div>
        </div>
    )
}
