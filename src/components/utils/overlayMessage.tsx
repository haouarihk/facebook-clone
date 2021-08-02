import React from 'react'
import styles from "./overlayMessage.module.scss";
import stylesPost from "src/components/posts/post.module.scss";
export default function OverlayMessage({ children, onBlur }: { onBlur?: any, children: any }) {
    return (<>
        <div className={styles.container} onClick={onBlur}>
        </div>
        <div className={stylesPost.body + " " + styles.body}>
            {children}
        </div>
    </>
    )
}
