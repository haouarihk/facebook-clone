
import React, { useEffect } from 'react'
import styles from "./index.module.scss"
import Comment, { CommentProps } from "./comment"
import New from './new';
import { FComments } from 'src/firebase/firestore';



export default function Comments({ userId, postId, data }: { userId?: string, postId?: string, data?: CommentProps[] }) {
    const [comments, setComments] = React.useState<CommentProps[]>(data || []);
    const [viewed, setViewed] = React.useState(false);
    const [viewedContent, setViewedContent] = React.useState<CommentProps[]>([]);
    // @ts-ignore
    useEffect(async () => {
        if (data) return;

        if (userId && postId) {
            //   getComments(userId, postId).then(setComments);
            (await FComments.getCommentsWatcher(userId, postId))(snapshots => {
                setComments(snapshots.docs.map(doc => ({ id: doc.id, postId, ...doc.data() } as CommentProps)
                ));
            })
        }
    }, [])

    useEffect(() => {
        if (viewed) {
            setViewedContent(comments);
        } else {
            setViewedContent(comments.slice(0, 8));
        }
    }, [comments, viewed])

    return (
        <div className={styles.body}>
            {!viewed && comments.length > 8 && <div className={styles.viewMore}
                onClick={_ => setViewed(true)}
            >view more ({comments.length - viewedContent.length})</div>}
            {
                viewedContent.map(c => (<Comment key={c.id} data={c} />))
            }
            <New userId={userId} postId={postId} />
        </div>
    )
}
