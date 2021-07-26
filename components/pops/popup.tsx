
import React, { useState, useEffect } from "react";
import Button from "../utils/button"
import styles from "./popup.module.scss"


export default function Popup({ children }: { children: any, } = { children: "" }) {
    return <div className={styles.body}>
        {children}
    </div>
}
