import { useLoaderData } from "react-router-dom";

export default function Home(){
    const posts = useLoaderData();
    console.log("posts", posts);
    

    return(
        <>
        <h1>Home</h1>
        </>
    )
}

export async function allPostsLoader(){

    try {
        const response = await fetch("http://localhost:8080/api/posts",{
            headers: {"Content-Type": "application/json"},
            method: "GET"
        });

        if(!response.ok){
            throw {message: "Failed to fetch posts", status: response.status}
        }

        return await response.json();
    } catch (error) {
        throw {message: "Something went wrong durign fetching all posts", error, status: error.status || 500}
    }

}