import { createContext, useState } from "react";
import { FUser } from "src/firebase/firestore";

/* types */
export interface cacheProviderProps {
    users: any;
    updateUser: (userId: string) => Promise<any>;
}

/* default values*/

const contextDefaultValues: cacheProviderProps = {
    users: {},
    updateUser: async (_: string) => console.error("EH NOT User Provider Not Inisialized")
};

/* user Context */
export const UsersCacheContext = createContext<cacheProviderProps>(
    contextDefaultValues
);


export default function UsersCacheProvider({ children }: any) {
    const [users, setUsers] = useState<any | null>(contextDefaultValues.users);


    const updateUser: (userId: string) => Promise<any> = (userId: string) => {
        return new Promise(async (solve, reject) => {
            FUser.getUser(userId).then((userData: any) => {
                setUsers((usr: any) => ({ ...usr, [userId]: userData }));
                solve(userData as any);
            }).catch(reject);
        });
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