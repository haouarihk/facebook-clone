import React from "react";
import { useEffect } from "react";
import { getPost } from "../../utils/apis";







export default () => {
    const [post, setPost] = React.useState(null);
    useEffect(() => {
        // get the id from the url
        const id = window.location.pathname.split("/").pop();
        console.log(id);
        // get the profile from the API
        getPost(id)
            .then((_post) => { setPost(_post); console.log("yo", _post); });

    }, [])
    return (
        <div>
            <h1>Post {post}</h1>
        </div>
    );
}
