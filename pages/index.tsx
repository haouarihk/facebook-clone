

import { useEffect } from 'react';
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
export default function Home() {
  const history = useRouter();
  let user: any = null;

  useEffect(() => {


    if (!user)
      history.push('/auth/login')

  }, [])


  return <div className={styles.container
  } >

  </div>


}
