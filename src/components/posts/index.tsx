import React, { useEffect } from 'react'
import { getUserPosts } from 'src/firebase/firestore';
import styles from "./index.module.scss";
import New from './new';
import Post from './post';

export default function Posts({ uId, data }: { uId?: string, data?: any }) {
    const [posts, setPosts] = React.useState([]);
    useEffect(() => {
        if (data) return;

        // get Posts
        if (uId)
            getUserPosts(uId).then(setPosts);
    }, []);

    return (
        <div className={styles.body}>
            <New />
            {[...posts].reverse().map((post: any) => <>
                <Post userId={uId as string} postId={post.pId} data={post} />
            </>)}
        </div>
    )
}
