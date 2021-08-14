import React, { useContext } from 'react'
import Img from "next/image"
import User from '../user';
import { UserContext } from 'src/contexts/userProvider';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { user, logout } = useContext(UserContext);
    const History = useRouter();
    const login = () => {
        History.push('/auth/login')
    }
    return (
        <div className='flex top-0 sticky justify-between content-center p-4 bg-white z-10'>
            <div className="">
                <Img width={290} height={44} src={require("public/facebookLogo.svg")} />
            </div>
            <div />

            {user ?
                <div className="flex items-center">
                    <div className="">
                        <User userId="me" />
                    </div>
                    <div className="p-4 hover:bg-red-100 focus:bg-red-200 select-none cursor-pointer" onClick={logout}>Logout</div>
                </div>
                :
                <div className="flex items-center">
                    <div className="">
                        <div className="p-4 hover:bg-red-100 focus:bg-red-200 select-none cursor-pointer" onClick={login}>Login</div>
                    </div>
                </div>
            }
        </div>)
}
