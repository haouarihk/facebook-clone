import axios from "axios";

export const getPost = (id: string | undefined) => {
    return axios.post(`/api/posts?id=${id}`, {
        credentials: 'include',
    }).then(a => a.data)
};

export const createPost = (content: any) => {
    return axios.post("/api/posts?do=create", {
        content
    })
}