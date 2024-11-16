import { useLoaderData } from "react-router-dom";
import CreateEditForm from "../components/CreateEditForm";

export default function Edit(){
    const singlePost = useLoaderData();
    console.log("singlePost", singlePost);
    

    return(
        <>
        <h1>Edit  post</h1>
        <CreateEditForm 
        method="PATCH" 
        id={singlePost.id}
        title={singlePost.title}
        desc={singlePost.desc}
         />
        </>
    )
}

