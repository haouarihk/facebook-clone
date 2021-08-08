

import { useContext, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import { UserContext } from 'src/contexts/userProvider';
import { UsersCacheContext } from 'src/contexts/usersCacheProvider';
import { getUser } from 'src/firebase/firestore';

export default function Home() {
  const history = useRouter();
  const { user } = useContext(UserContext);
  const { updateUser } = useContext(UsersCacheContext);
  useEffect(() => {

    if (!user) {
      history.push('/auth/login'); return
    }

    getUser(user.uid).then(user => updateUser(user?.uid, user));
  }, [user])

  return <div className={styles.container
  } ></div>
}
