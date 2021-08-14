import React, { useContext, useEffect } from 'react'
import { UserContext } from 'src/contexts/userProvider';
import { UsersCacheContext } from 'src/contexts/usersCacheProvider';
import { FPosts } from 'src/firebase/firestore';
import Posts from './posts'
import { PostData } from './posts/post';

export default function Feeds() {
    const { user } = useContext(UserContext)
    const { users } = useContext(UsersCacheContext)
    let [data, setData] = React.useState<PostData[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    if (!user?.uid) return <h1>loading...</h1>

    useEffect(() => {
        const usr = users[user.uid];
        if (usr) {
            (async () => {
                for (let i = 0; i < usr.following.length; i++) {
                    setData(data = data.concat((await FPosts.getPosts(usr.following[i]))));
                }
                setLoading(true);
            })()
        };

    }, [user, users[user.uid]])

    console.log(data)
    return (loading ?
        <div>
            <Posts uId={user.uid} data={data} />
        </div>
        : <h1>loading...</h1>
    )
}
