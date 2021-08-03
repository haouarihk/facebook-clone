import { MoreHoriz } from '@material-ui/icons';
import React, { useState } from 'react'
import User from 'src/components/user'
import ItemList from 'src/components/utils/itemList';
import { FComments } from 'src/firebase/firestore';

import styles from "./comment.module.scss";

export interface CommentProps {
    id: string;
    userId: string;
    postId: string;
    content: string;
    likes?: number
}

export default function comment({ data }: { data: CommentProps }) {
    const [viewOptions, setViewOptions] = useState(false);
    const rmC = (_: any) => {
        FComments.RemoveComment(data.userId, data.postId, data.id)
    }
    return (
        <div className={styles.body}
            onMouseLeave={(_: any) => setViewOptions(false)} >
            <User userId={data.userId} stats={{ isPublic: false, hm: data.content, stat: "comment" }} />
            <div className={styles.options}>
                <div className={styles.button}
                    onClick={() => setViewOptions(!viewOptions)}
                >
                    <MoreHoriz />
                </div>
                {viewOptions &&
                    <ItemList >
                        <div onClick={rmC}>Delete</div>
                    </ItemList>
                }
            </div>

        </div >
    )
}

