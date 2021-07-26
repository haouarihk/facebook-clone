import axios from "axios";
import React from "react"
import { useEffect } from "react";

import styles from "./index.module.scss"
import New from "./new";

import Post, { PostData } from "./post";


export default function Posts() {
    const [posts, setPosts] = React.useState<PostData[]>([]);
    useEffect(() => { axios.get("/api/posts?do=getAll").then(k => setPosts(k.data)) }, []);
    console.log(posts);
    return (
        <div className={styles.body}>
            <New />
            {[...posts].reverse().map((post, i) => <Post key={i} id={post._id} data={post} />)}
        </div>
    );
}
