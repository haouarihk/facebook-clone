import { createContext, useEffect, useState } from "react";
import { auth, firebaseApp } from "src/firebase";
import { User } from "firebase/auth";

/* types */
export interface UserProviderProps {
    user: User | null;
    setUser: ((user: string) => void);
    logout: (() => void);
}

/* default values*/

const contextDefaultValues: UserProviderProps = {
    user: null,
    setUser: () => console.error("EH NOT User Provider Not Inisialized"),
    logout: () => console.error("EH NOT User Provider Not Inisialized")
};

/* user Context */
export const UserContext = createContext<UserProviderProps>(
    contextDefaultValues
);


export default function UserProvider({ children }: any) {
    const [user, setUserr] = useState<User | null>(contextDefaultValues.user);

    useEffect(() => {
        const k = localStorage.getItem("user");
        if (k)
            setUserr(JSON.parse(k))
    }, [])


    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    const setUser = (_usr: any) => {
        localStorage.setItem("user", JSON.stringify(_usr));
        setUserr(_usr);
    }

    return (
        <UserContext.Provider
            value={{ user, setUser, logout }
            }
        >
            {children}
        </UserContext.Provider>
    )

}