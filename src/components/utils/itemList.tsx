import React from 'react'
import styles from "./itemList.module.scss"
export default function ItemList({ children }: { children: any }) {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}
