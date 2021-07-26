
import React from "react"
import { useEffect } from "react";
import styles from "./login.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
export default function LoginPage() {
    const [creditial, setCreditial] = React.useState({ username: "", password: "" });
    const [error, setError] = React.useState("asdas");

    const { loginWithRedirect } = useAuth0();

    const onSubmit = async () => {
        loginWithRedirect();
        // const username = creditial.username;
        // const password = creditial.password;

        // // check username special characters
        // if (username.match(/[^a-zA-Z0-9_]/)) {
        //     setError("Username must be alphanumeric");
        //     return;
        // }

        // // check if password is not empty and above 8 characters
        // if (password.length < 8) {
        //     setError("Password must be at least 8 characters");
        //     return;
        // }

        // // send request to /api/login
        // const response = await fetch("/api/auth", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     // 0 for login, 1 for register, 2 for reset password, 3 for logout;
        //     body: JSON.stringify({ username, password, do: 0 })
        // })

        // if (response.status !== 200) {
        //     setError("Invalid username or password");
        //     return;
        // }

        // setCreditial({ username: "", password: "" });

        // // get season key from response
        // const seasonKey = (await response.json())?.seasonKey;
        // if (!seasonKey) {
        //     alert("Invalid username or password");
        //     return;
        // }
        // // set season key in local storage
        // localStorage.setItem("seasonKey", seasonKey);

        // // redirect to /
        // window.location.href = "/";
    }


    useEffect(() => {


    }, [creditial]);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div></div>
                    Connect with friends and the world around you on Facebook.

                </div>
                <div className={styles["login-form"]}>
                    <div>
                        <div className={(error ? styles.error : "") + " " + styles.errorb}>{error}</div>
                        <input type="text" onClick={() => setError("")} placeholder="Email or Phone number" className={styles.input} />
                        <input type="text" onClick={() => setError("")} placeholder="Password" className={styles.input} />

                        <button className={styles.button} onClick={onSubmit}>Log In</button>
                    </div>
                </div>
            </div>




            {/* <div className={styles.item}>
                <input placeholder="Email" className={styles.second} value={creditial.username} onChange={(e) => setCreditial({ ...creditial, username: e.target.value })} type="text" name="username" />
            </div>
            <div className={styles.item}>
                <input placeholder="Password" className={styles.second} type="password" name="password" value={creditial.password} onChange={(e) => setCreditial({ ...creditial, password: e.target.value })} />
            </div>
            <div className={styles.item}>
                <button className={styles.first} onClick={onSubmit}>login</button>
            </div> */}
        </div>
    )
}