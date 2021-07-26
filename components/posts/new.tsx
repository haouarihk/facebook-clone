import React from 'react';
import { useState } from 'react'

import Popup from '../pops/popup'
import User from '../users/user';
import Button from '../utils/button';
import styles from './new.module.scss'
import postStyle from "./post.module.scss";
import axios from 'axios';
import { useEffect } from 'react';
import { createPost } from '../../utils/apis';



export function NewPost({ onSubmit, onCancel }: { onSubmit: (content?: string) => void, onCancel?: () => void }) {
    const [content, setContent] = useState("");
    let contentRef: any;
    useEffect(() => {
        console.log("content", contentRef);
        if (contentRef)
            contentRef.focus();
    }, [contentRef]);
    return (<React.Fragment>
        <Popup>
            <div className={postStyle.body + " " + styles.body}>
                <div className={styles.newPostHeader}>
                    <h1>Create Post</h1>

                    <Button onClick={() => (onCancel || (() => { }))()} />
                </div>

                <div ref={contentRef} className={styles.content + " " + (content.length > 50 || content.split("\n").length > 10 ? styles.overflowContent : "")}>
                    <textarea spellCheck={true} className={styles.text} onChange={(e) => setContent(e.target.value)} placeholder={"What's on your mind"} value={content} />
                </div>

                <div className={styles.foot}>
                    <Button title="Post" onClick={() => onSubmit(content)} />
                </div>
            </div>
        </Popup>
    </React.Fragment>
    )
}




export default function New() {
    const [popup, setPopup] = useState(false);

    const onSubmit = async (content: string | undefined) => {
        console.log("try submit");
        createPost(content).then((res) => {
            console.log(res);
            // setPopup(false);
            // setTimeout(() => {
            //     window.location.href = "/posts/" + res.data.id;
            // }, 1000);
        }).catch((err) => {
            console.log(err);
        });



        setPopup(false);
    }
    const onCancel = () => {
        setPopup(false);
    }

    return (<React.Fragment>
        {popup ? <NewPost onSubmit={onSubmit} onCancel={onCancel} /> : null}

        <div className={styles.body}>
            <div className={styles.header}>
                <User id={"222"} hideName={true} />
                <input placeholder="What are you thinking of?" className={styles.input} onClick={() => setPopup(true)} />
            </div>
        </div>
    </React.Fragment>);
}