

import { useContext, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import { UserContext } from 'src/contexts/userProvider';

export default function Home() {
  const history = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user)
      history.push('/auth/login')

  }, [user])

  return <div className={styles.container
  } ></div>
}
