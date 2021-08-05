import { Button, TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useRef } from 'react'
import { FPosts } from 'src/firebase/firestore';
import User from '../user';
import OverlayMessage from '../utils/overlayMessage';
import { decay2 } from '../utils/spamProtection';
import styles from "./new.module.scss";
import stylesPost from "./post.module.scss";





export function NewPost({ userId, end }: { userId: string, end: Function }) {
    const [content, setContent] = React.useState('');
    const [showButton, setShowButton] = React.useState(false);
    const taRef = useRef<any>();
    useEffect(() => {
        taRef?.current?.focus();
    }, []);


    useEffect(() => {
        if (decay2(content))
            setShowButton(false);
        else
            setShowButton(true);
    }, [content]);

    const onSubmit = async (_: any) => {
        if (decay2(content)) return;

        setShowButton(false);
        await FPosts.PutPost(userId as string, { content }).catch(alert);
        end();
    }

    return <form className={styles.container}>
        <div className={styles.header}>
            <User userId={userId} />
            <h2>New Post</h2>
            <Button onClick={(_: any) => end()}>x</Button>
        </div>

        <TextareaAutosize ref={taRef} placeholder="What's on your mind?" className={styles.textarea} value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type="submit" disabled={!showButton} onClick={onSubmit}>Post</Button>
    </form>
}



export default function New({ userId }: { userId: string }) {
    const [showOvelay, setShowOverlay] = React.useState(false);
    return (
        <div className={stylesPost.body} style={{ flexDirection: "row" }}>
            <User onlyAvatar />
            <div className={styles.input}
                onClick={() => setShowOverlay(true)}
            >
                What are you thinking of?
            </div>

            {
                showOvelay &&
                <OverlayMessage
                    onBlur={() => setShowOverlay(false)}
                >
                    <NewPost userId={userId} end={() => setShowOverlay(false)} />
                </OverlayMessage>
            }
        </div >

    )
}
