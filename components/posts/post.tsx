import { useEffect, useState } from 'react';
import { getPost } from '../../utils/apis';
import User from '../users/user';
import Button from '../utils/button';
import styles from './post.module.scss';



export interface PostData {
    _id: string | undefined;
    userId: string | null;
    content: string | null;
    likesId: string[] | null;
    commentsId: string[] | null;
    createdAt: Date,
    updatedAt: Date
}

const defaultPost: PostData = {
    _id: undefined,
    userId: null,
    content: null,
    likesId: null,
    commentsId: null,
    createdAt: new Date(),
    updatedAt: new Date()
};


export default function Post({ id, data }: { id?: string, data?: PostData }) {
    const [post, setPost] = useState<PostData>(defaultPost);
    useEffect(() => {
        if (data?.content) {
            setPost(data);
        } else {
            getPost(id).then(setPost);
        }
    }, []);
    console.log(post);
    return post ? (
        <div className={styles.body}>
            {post._id}
            <div className={styles.header}>
                <User id={post?.userId || null} />
            </div>
            <div className={styles.content}>
                <a>{post.content}</a>
            </div>


            <div className={styles.stats}>
                <div className={"likes"}>
                    {post.likesId} likes
                </div>
                <div className={"comments"}>
                    {post.commentsId?.length} comments
                </div>
            </div>
            <div className={styles.footer}>
                <Button title="" />
                <div className={styles.like}>
                    like
                </div>
                <div className={styles.comment}>
                    comment
                </div>
            </div>

        </div>
    ) : <div>can't find it</div>;
}