import React from 'react'
import styles from "./intro.module.scss"
export default function Intro({ content, mine }: { content?: string, mine?: string }) {
    return (<>
        <div className={styles.body}>
            <h3>Intro</h3>
            {content}
        </div>
    </>
    )
}
