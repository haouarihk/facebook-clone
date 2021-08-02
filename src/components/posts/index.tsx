import React, { useEffect } from 'react'
import { FPosts, getUserPosts } from 'src/firebase/firestore';
import styles from "./index.module.scss";
import New from './new';
import Post from './post';


export interface PostProps {
    id: string;
    content: string;
    userId: string;

}


export default function Posts({ uId, data }: { uId?: string, data?: PostProps }) {
    const [posts, setPosts] = React.useState<PostProps[]>([]);
    const [viewed, setViewed] = React.useState(false);
    const [viewedContent, setViewedContent] = React.useState<PostProps[]>(data || []);

    useEffect(() => {
        if (data) return;

        // get Posts
        if (uId) {
            FPosts.getPostsWatcher(uId).orderBy("timestamp", "desc").onSnapshot(snapshots => {
                setPosts(snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostProps)
                ));
            })
        }
    }, []);

    useEffect(() => {
        if (viewed) {
            setViewedContent(posts);
        } else {
            setViewedContent(posts.slice(0, 8));
        }
    }, [posts, viewed])

    return (
        <div className={styles.body}>
            <New userId={uId as string} />
            {
                viewedContent.map((post: any) => <>
                    <Post key={post.id} userId={uId as string} postId={post.pId} data={post} />
                </>)
            }
            {!viewed && posts.length > 8 && <div className={styles.viewMore}
                onClick={_ => setViewed(true)}
            >view more ({posts.length - viewedContent.length})</div>}
        </div>
    )
}
