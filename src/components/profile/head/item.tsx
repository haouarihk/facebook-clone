import React, { useEffect } from 'react'
import styles from "./item.module.scss"
export default function Item({ name, className, active }: { name: string, active?: boolean, className?: string }) {

    return (
        <div className={styles.item + " " + (active ? styles.active : "") + " " + (className || "")}>{name || ""}</div>
    )
}
