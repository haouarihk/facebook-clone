import { useRouter } from 'next/dist/client/router';
import React from 'react'
import Post from 'src/components/posts/post';
import styles from "./index.module.scss";

export default function PostPage({ pId, uId }: any) {
    const { query } = useRouter()

    return (
        <>
            <Post userId={(uId || query.uId) as string} postId={(pId || query.pId) as string} />
        </>
    )
}

// This function gets called at build time
export async function getServerSideProps(k: any) {
    const { uId, pId } = k.query;
    return { props: { uId, pId } }
}