import { MoreHoriz, Public } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { getPost } from 'src/firebase/firestore';
import User from '../user';
import styles from "./post.module.scss";

export interface PostData {
    content: string;
    isPublic: boolean;
    timestamp: Date;
}


export const defaultPost = {
    content: " ",
    isPublic: true,
    timestamp: new Date()
}

export default function Post({ userId, postId, data }: { userId: string, postId: string, data?: PostData }) {
    const [post, setPost] = React.useState<PostData>(data || defaultPost);
    useEffect(() => {
        if (data) return
        getPost(userId, postId).then(setPost);

    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.user}>
                    <User userId={userId} stats={{ isPublic: post.isPublic, hm: "" + (new Date(new Date().getTime() - new Date(post.timestamp).getTime()).getHours()) + "h" }} />
                </div>
                <div className={styles.settings}>
                    <MoreHoriz />
                </div>
            </div>
            <div className={styles.content}>
                {post?.content}
            </div>
        </div>
    )
}
