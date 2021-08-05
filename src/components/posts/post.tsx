import { Comment, MoreHoriz, Public, ThumbUp } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { FPosts } from 'src/firebase/firestore';
import User from '../user';
import ItemList from '../utils/itemList';
import Comments from './comments';
import styles from "./post.module.scss";

export interface PostData {
    id: string;
    userId: string;
    content: string;
    isPublic: boolean;
    timestamp: Date;
}


export const defaultPost = {
    id: "",
    userId: "",
    content: " ",
    isPublic: true,
    timestamp: new Date()
}

export default function Post({ userId, postId, data }: { userId: string, postId: string, data?: PostData }) {
    const [post, setPost] = React.useState<PostData>(data || defaultPost);
    const [viewComments, setViewComments] = React.useState<boolean>(false);


    const [viewOptions, setViewOptions] = React.useState(false);

    const rmP = async (_: any) => {
        console.log(userId, postId)
        await FPosts.RemovePost(userId, postId).catch(console.log)
        setViewOptions(false)
    }


    useEffect(() => {
        if (data) return
        FPosts.getPost(userId, postId).then(setPost).catch(alert);

    }, [])

    const TVC: any = () =>
        setViewComments(!viewComments)


    return (
        <div className={styles.body}>
            <div className={styles.head}
                onMouseLeave={(_: any) => setViewOptions(false)} >
                <div className={styles.user}>
                    <User userId={userId} stats={{ isPublic: post.isPublic, hm: "" + (new Date(new Date().getTime() - new Date(post.timestamp).getTime()).getHours()) + "h" }} />
                </div>
                <div className={styles.options}>
                    <div className={styles.stnBtn}
                        onClick={() => setViewOptions(!viewOptions)}
                    >
                        <MoreHoriz />
                    </div>
                    {viewOptions &&
                        <ItemList >
                            <div onClick={rmP}>Delete</div>
                        </ItemList>
                    }
                </div>
            </div>
            <div className={styles.content}>
                {post?.content}
            </div>

            <div className={styles.footer}>
                <div className={styles.bottons}>
                    <div className={styles.button}>
                        <ThumbUp /> Like
                    </div>
                    <div className={styles.button} onClick={TVC}>
                        <Comment /> Comment
                    </div>
                </div>

                {viewComments && <div className={styles.comments}>
                    <Comments userId={userId} postId={postId} />
                </div>}
            </div>
        </div>
    )
}
