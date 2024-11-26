import { useLoaderData } from "react-router-dom";
import AllPosts from "../components/AllPosts";

import classes from "./Home.module.css";

export default function Home() {
    const posts = useLoaderData();
    console.log("posts", posts);


    return (
        <main>
            <h2>ALL NOTES</h2>
            <div className={classes.allNotes}>
                {posts.length > 0 && posts.map((post) => (
                    <AllPosts key={post.id} id={post.id} title={post.title} desc={post.desc} />
                )
                )}

                {posts.length <= 0 && <h2>No posts to show!</h2>}
            </div>
        </main>
    )
}

export async function allPostsLoader() {

    try {
        const response = await fetch("http://localhost:8080/api/posts", {
            headers: { "Content-Type": "application/json" },
            method: "GET"
        });

        if (!response.ok) {
            throw { message: "Failed to fetch posts", status: response.status }
        }

        return await response.json();
    } catch (error) {
        throw { message: "Something went wrong durign fetching all posts", error, status: error.status || 500 }
    }

}