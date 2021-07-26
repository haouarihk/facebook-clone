import React from "react";
import { useEffect } from "react";







export default () => {
    useEffect(() => {
        // get the id from the url
        const id = window.location.pathname.split("/").pop();
        console.log(id);
        // get the profile from the API
        fetch(`/api/profile?id=${id}`)
            .then(response => response.json())
            .then(profile => {
                // profile here
            });

    }, [])
    return (
        <div>
            <h1>Profile { }</h1>
        </div>
    );
}
