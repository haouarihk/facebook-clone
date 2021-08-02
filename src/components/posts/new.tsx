import { Button, TextareaAutosize } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react'
import { PutPost } from 'src/firebase/firestore';
import User from '../user';
import OverlayMessage from '../utils/overlayMessage';
import styles from "./new.module.scss";
import stylesPost from "./post.module.scss";


function decay(arr: string[]) {
    const _arr = [...arr];
    for (let i = 0; i < _arr.length; i++) {
        if (_arr[i].replace(/\n/gi, "") == "") {
            _arr.splice(i, 1);
            i--;
        }
    }
    return _arr;
}

export function NewPost({ userId, end }: { userId: string, end: Function }) {
    const [content, setContent] = React.useState('');
    const [showButton, setShowButton] = React.useState(false);
    const taRef = useRef();
    useEffect(() => {
        // @ts-ignore
        taRef?.current?.focus();
    }, []);


    useEffect(() => {
        if (decay(content.split(' ')).length > 0)
            setShowButton(true);
        else
            setShowButton(false);
    }, [content]);

    const onSubmit = async (_: any) => {
        if (decay(content.split(' ')).length <= 0) return;

        setShowButton(false);
        await PutPost(userId as string, { content }).catch(alert);
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
