import React from 'react'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Posts from '../components/posts'


export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar currentPage={"0"} />
      <Posts />

    </div>
  )
}
