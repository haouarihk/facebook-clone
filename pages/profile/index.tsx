import { useEffect } from 'react'

export default function index() {
    useEffect(() => {
        const id = window.location.pathname.split('/').pop()
        window.location.href = `/profile/${id}`
    }, []);
}
