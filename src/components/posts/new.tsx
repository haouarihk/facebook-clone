import React from 'react'
import User from '../user';
import styles from "./new.module.scss";
import stylesPost from "./post.module.scss"
export default function New() {
    return (
        <div className={stylesPost.body} style={{ flexDirection: "row" }}>
            <User onlyAvatar />
            <div className={styles.input}>
                What are you thinking of?

            </div>
        </div>

    )
}
