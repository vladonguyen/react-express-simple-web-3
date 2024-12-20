import { Form, Link, redirect, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";

import classes from "./PostId.module.css";
import { getToken } from "../utils/auth";

export default function PostId() {
    const singlePost = useLoaderData();
    const token = useRouteLoaderData("routetoken");

    return (
        <>
            <div className={classes.postBody}>
                <div>
                    <h1>{singlePost.title}</h1>
                    <p>{singlePost.desc}</p>
                </div>

                {token && (
                    <>
                        <div className={classes.controls}>
                            <div className={classes.edit}> <Link to="edit">Edit</Link></div>
                            <div className={classes.delete}>
                                {/* Form method is very important to be set! */}
                                <Form method="POST"><button>Delete</button></Form>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export async function loaderPostById({ params, request }) {

    //check if it is edit page whether there is token
    const currentUrl = new URL(request.url);
    const isEditPage = currentUrl.pathname.endsWith("/edit");

    if (isEditPage) {
        const token = getToken();
        if (!token) {
            return redirect("/login");
        }
    }


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
    const token = getToken();

    const boolean = window.confirm("Do you want to delete this post?");
    if (boolean === true) {
        const response = await fetch(`http://localhost:8080/api/posts/${params.id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + token
            }
        })

        return redirect("/")
    }

    return null;
}

export async function deletePost({ params }) {
}
