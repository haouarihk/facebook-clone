import React from 'react'
import { useEffect } from 'react'
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


export default function profileHead({ userData }: any) {
    const [user, setUser] = React.useState(userData || defaultUser)
    useEffect(() => {
        if (userData) return
        // get id
        const id = window.location.pathname.split('/')[2]
        console.log('profile')

        // get user from firestore
        getUser(id).then(setUser)

    }, []);
    return (<div className={styles.body}>
        <Head userData={user} />
        <div className={styles.content}>

            <div className={styles.sidebar}>
                <Intro content={user.intro} />
            </div>
            <div className={styles.mainContent}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum delectus, debitis placeat recusandae nihil autem soluta quos aliquid labore provident facere impedit consequatur libero reprehenderit officia a totam amet earum.</div>
        </div>
    </div>
    )
}


// This function gets called at build time
export async function getServerSideProps(k: any) {
    const { id } = k.query
    // Call an external API endpoint to get posts
    // get user from firestore
    const userData = await getUser(id)
    // Get the paths we want to pre-render based on posts

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { props: { user: userData } }
}