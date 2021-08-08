import React from 'react'
import styles from "./index.module.scss";
import Img from "next/image"
import User from '../user';
export default function Navbar() {
    return (
        <div className={styles.body}>
            <div className={styles.sum}>
                <Img width={264} height={64} src={require("public/facebookLogo.svg")} />
            </div>
            <div className={styles.options}>
                <div className={styles.item}>
                    <User userId="me" />
                </div>
                <div className={styles.item}>k</div>
                <div className={styles.item}>k</div>
            </div>
        </div>
    )
}
