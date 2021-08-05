import { createContext, useState } from "react";

/* types */
export interface cacheProviderProps {
    users: any;
    updateUser: ((userId: string, userData: any) => void);
}

/* default values*/

const contextDefaultValues: cacheProviderProps = {
    users: {},
    updateUser: () => console.error("EH NOT User Provider Not Inisialized")
};

/* user Context */
export const UsersCacheContext = createContext<cacheProviderProps>(
    contextDefaultValues
);


export default function UsersCacheProvider({ children }: any) {
    const [users, setUsers] = useState<any | null>(contextDefaultValues.users);


    const updateUser = (userId: string, userData: any) => {
        setUsers((usr: any) => ({ ...usr, [userId]: userData }))
    }

    return (
        <UsersCacheContext.Provider
            value={{ users, updateUser }
            }
        >
            {children}
        </UsersCacheContext.Provider>
    )

}