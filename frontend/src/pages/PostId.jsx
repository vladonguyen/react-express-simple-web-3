import { Link, useLoaderData } from "react-router-dom";

export default function PostId(){
const singlePost = useLoaderData();

    return(
        <>
        <h1>{singlePost.title}</h1>
        <h1>{singlePost.desc}</h1>
        <p><Link to="edit">Edit</Link></p>
        <p><Link to="delete">Delete</Link></p>
        </>
    )
}

export async function loaderPostById({params}) {
    try {
        const postId = params.id;
        console.log("postId", postId)

        const response = await fetch(`http://localhost:8080/api/posts/${postId}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });

        if(!response.ok){
            throw {message: "Fetch single posts didn't work!", status: response.status}
        }
        return await response.json();
    } catch (error) {
        throw {message: error.message || "something went wrong with fetching single post", status: error.status || 500}
    }
}