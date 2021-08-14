import React, { useEffect } from 'react'
import { FPosts, FUser } from 'src/firebase/firestore';
import styles from "./index.module.scss";
import New from './new';
import Post, { PostData } from './post';


export default function Posts({ uId, data }: { uId?: string, data?: PostData[] }) {
    const [posts, setPosts] = React.useState<PostData[]>(data || []);
    const [viewed, setViewed] = React.useState(false);
    const [viewedContent, setViewedContent] = React.useState<PostData[]>([]);
    //@ts-ignore
    useEffect(async () => {
        if (data) return;

        // get Posts
        if (uId) {
            (await FPosts.getPostsWatcher(uId))(snapshots => {
                setPosts(snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostData)
                ));
            })
        }
    }, []);

    useEffect(() => {
        if (viewed) {
            setViewedContent([...posts].reverse());
        } else {
            setViewedContent([...posts].reverse().slice(0, 8));
        }
    }, [posts, viewed])

    return (
        <div className={styles.body}>
            <New userId={uId as string} />
            {viewedContent.map((_post: PostData) => <Post key={_post.userId + _post.id} userId={_post.userId as string} postId={_post.id} data={_post} />
            )}

            {!viewed && posts.length > 8 && <div className={styles.viewMore}
                onClick={_ => setViewed(true)}
            >view more ({posts.length - viewedContent.length})</div>}
        </div>
    )
}
