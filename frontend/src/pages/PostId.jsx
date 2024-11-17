import { Form, Link, redirect, useLoaderData, useNavigate } from "react-router-dom";

export default function PostId() {
    const singlePost = useLoaderData();

    return (
        <>
            <h1>{singlePost.title}</h1>
            <h1>{singlePost.desc}</h1>
            <p><Link to="edit">Edit</Link></p>
            <Form method="POST"><button>Delete</button></Form>
        </>
    )
}

export async function loaderPostById({ params }) {
    try {
        const postId = params.id;
        console.log("postId", postId)

        const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw { message: "Fetch single posts didn't work!", status: response.status }
        }
        return await response.json();
    } catch (error) {
        throw { message: error.message || "something went wrong with fetching single post", status: error.status || 500 }
    }
}

// ASK AND DELETE - EXERCISE MORE!
export async function askBeforeDelete({ params }) {
    console.log(params);

    const boolean = window.confirm("Do you want to delete this post?");
    if (boolean === true) {
        const response = await fetch(`http://localhost:8080/api/posts/${params.id}/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })

        return redirect("/")
    }

    return null;
}

export async function deletePost({ params }) {
}
