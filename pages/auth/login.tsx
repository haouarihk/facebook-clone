import React, { useContext, useEffect } from 'react';
import Img from "next/image";
import styles from "./login.module.scss"
import { useRouter } from 'next/router'
import * as auth from 'src/firebase/auth';
import { decay2 } from 'src/components/utils/spamProtection';
import { UserCredential } from '@firebase/auth';
import { UserContext } from 'src/contexts/userProvider';

export default function Login() {
    const history = useRouter();
    const goback = () => {
        history.push('/')
    }

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { user, setUser } = useContext(UserContext);

    const updateUser = (_user: any) => {
        setUser(_user);
        console.log(`%c ${auth.getUser()}`, "color:pink;")
    }

    const login = () => {
        if (decay2(email) || decay2(password)) return;
        auth.Login.login(email, password).then((c: any) => {
            updateUser(c.user)
            goback()
        }).catch(({ message }: any) => alert(`Login failed: ${message}`));
    }

    const loginWith = (lb: Promise<UserCredential>) => {
        lb.then((c) => {
            updateUser(c.user)
            goback()
        }).catch(({ message }: any) => alert(`Login failed: ${message}`));

    }

    const loginFacebook = () => {
        loginWith(auth.Login.facebook())
    }

    const loginGoogle = () => {
        loginWith(auth.Login.google())
    }


    useEffect(() => {
        if (user) history.back();
    }, [user]);

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.container}>
                    <Img className={styles.logo} src={require('public/facebookLogo.svg')} alt="facebook" />
                    <div className={styles.desc}>
                        With Facebook, share and stay in touch with those around you.
                    </div>
                </div>
            </div>

            <div className={styles.login}>
                <div className={styles.hmlogin}>

                    <input className={styles.item} type="text" placeholder="Email address or phone number."
                        value={email} onChange={e => setEmail(e.target.value)}
                        name="username" />

                    <input className={styles.item} type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="Password" name="pass" />

                    <div className={styles.item + " " + styles.button}
                        onClick={() => login()}>
                        Login</div>

                    <div style={{ borderBottom: "1px solid black", flex: 1, width: "100%", marginBottom: "2rem" }} />
                    login using:
                    <div className={styles.item + " " + styles.button}
                        onClick={loginGoogle}
                    >Google</div>
                    <div className={styles.item + " " + styles.button}
                        onClick={loginFacebook}
                    >Facebook</div>

                </div>
                Create a Page for a celebrity, group or business.


            </div>
        </div>
    )
}
