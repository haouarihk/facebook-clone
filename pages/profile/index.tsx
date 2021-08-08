import { useContext, useEffect } from 'react'
import { UserContext } from 'src/contexts/userProvider';

export default function Index() {
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        if (!user) return;
        const id = user.uid
        window.location.href = `/profile/${id}`;
    }, [user]);
    return user ? <div>Profile</div>
        : <div>Loading...</div>
}






