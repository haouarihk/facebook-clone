import React from "react";
import Img from "next/image";
import styles from "./index.module.scss";
import { useEffect } from "react";
import Item from "./item";


export default function Head({ userData }: any) {
    const [page, setPage] = React.useState<string | undefined>("profile");
    useEffect(() => {
        //get page name
        setPage(window.location.pathname.split("/").pop()?.toLocaleLowerCase())
    }, []);
    console.log(page);
    return (<>
        <div className={styles.banner} style={{ backgroundImage: `url("${userData?.bannerUrl}")` }}>
            <div className={styles.person}>
                <div className={styles.avatarHolder}>
                    <img className={styles.avatar} src={userData?.avatarUrl} />
                </div>
                <div className={styles.name}>
                    {userData?.name}
                </div>
            </div>
        </div>
        <div className={styles.info}>
            <div className={styles.menu}>
                <Item name={"Posts"} active={page != "about" && page != "friends"} />
                <Item name={"About"} active={page == "about"} />
                <Item name={"Friends"} active={page == "friends"} />
            </div>
            <div className={styles.menu}>
                <Item name={"Add Friend"} />
                <Item name={"Send Message"} />
            </div>

        </div>
    </>
    )
}