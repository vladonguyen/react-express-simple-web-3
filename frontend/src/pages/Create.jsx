import CreateEditForm from "../components/CreateEditForm";


export default function Create(){

    return(
        <>
        <h1>Create new post</h1>
        <CreateEditForm method="POST" />
        </>
    )
}

