

import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import { UserContext } from 'src/contexts/userProvider';
import { UsersCacheContext } from 'src/contexts/usersCacheProvider';
import Feeds from 'src/components/feeds';

export default function Home() {
  const history = useRouter();
  const { user } = useContext(UserContext);
  const { updateUser } = useContext(UsersCacheContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!user) {
      history.push('/auth/login'); return
    }
    updateUser(user?.uid)
  }, [user])

  return (<>
    {loading ? (
      <div className={styles.container} >
        <Feeds />
      </div >) : <h2>waiting... </h2>}
  </>)
}
