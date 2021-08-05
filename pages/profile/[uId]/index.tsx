import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useEffect } from 'react'
import Posts from 'src/components/posts';
import Head from 'src/components/profile/head';
import Intro from 'src/components/profile/intro';
import { getUser } from 'src/firebase/firestore'
import styles from "./index.module.scss"

export const defaultUser = {
    name: "wait",
    avatarUrl: "",
    bannerUrl: "",
    intro: ""
}


export default function ProfileHead({ userData, uId }: { uId: string, userData?: any }) {
    const [user, setUser] = React.useState(userData || defaultUser)
    useEffect(() => {

        if (userData) return

        // get user from firestore
        if (uId)
            getUser(uId as string).then(setUser)

    }, []);
    console.log(user);
    return (<div className={styles.body}>
        <Head userData={user} />
        <div className={styles.content}>

            <div className={styles.sidebar}>
                <Intro content={user.intro} />
            </div>
            <div className={styles.mainContent}>
                <Posts uId={uId} />
            </div>
        </div>
    </div>
    )
}


// This function gets called at build time
export async function getServerSideProps(k: any) {
    const { uId } = k.query
    // Call an external API endpoint to get posts
    // get user from firestore
    const userData = await getUser(uId)
    // Get the paths we want to pre-render based on posts

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { props: { user: userData, uId } }
}