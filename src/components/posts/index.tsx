import React, { useEffect } from 'react'
import { FPosts, getUserPosts } from 'src/firebase/firestore';
import styles from "./index.module.scss";
import New from './new';
import Post, { PostData } from './post';


export default function Posts({ uId, data }: { uId?: string, data?: PostData[] }) {
    const [posts, setPosts] = React.useState<PostData[]>([]);
    const [viewed, setViewed] = React.useState(false);
    const [viewedContent, setViewedContent] = React.useState<PostData[]>(data || []);
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
    console.log(viewedContent)
    return (
        <div className={styles.body}>
            <New userId={uId as string} />
            {viewedContent[0] &&
                viewedContent.map((_post: PostData) => <>
                    {/* @ts-ignore */}
                    {<Post key={_post.id + Math.random()} userId={uId as string} postId={_post.id} data={_post} />}
                </>)
            }

            {!viewed && posts.length > 8 && <div className={styles.viewMore}
                onClick={_ => setViewed(true)}
            >view more ({posts.length - viewedContent.length})</div>}
        </div>
    )
}
