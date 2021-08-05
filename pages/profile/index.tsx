import { useEffect } from 'react'

export default function Index() {
    useEffect(() => {
        const id = window.location.pathname.split('/').pop()
        window.location.href = `/profile/${id}`
    }, []);
    return <div>Profile</div>
}
