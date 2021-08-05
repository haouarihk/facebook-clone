import { Input, OutlinedInput } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import React from 'react'
import User from 'src/components/user'
import { decay2 } from 'src/components/utils/spamProtection'
import { FComments } from 'src/firebase/firestore'

import styles from "./new.module.scss"
export default function New({ userId, postId }: { userId?: string, postId?: string }) {
    const [content, setContent] = React.useState<string>("");
    const [enabled, setEnabled] = React.useState<boolean>(true);
    const sub = async (e: any) => {
        e.preventDefault();

        if (decay2(content)) return;


        setEnabled(false);
        // create new comment
        if (userId && postId) await FComments.PutComment(userId, postId, { content });

        setContent("");

        setEnabled(true)

    }
    return (
        <form className={styles.body}>
            <User onlyAvatar userId={userId} />
            <Input type="text" disabled={!enabled}
                value={content} onChange={e => setContent(e.target.value)} className={styles.input} placeholder={"Write an answer.."} />
            <button type="submit" className={styles.button} onClick={sub}>
                <ArrowForward />
            </button>
        </form>
    )
}
