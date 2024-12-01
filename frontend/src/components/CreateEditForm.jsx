import { Form, redirect } from "react-router-dom";

import classes from "./CreateEditForm.module.css";

import { AiOutlineFileAdd } from "react-icons/ai";
import { getToken } from "../utils/auth";


export default function CreateEditForm({ method, id, title, desc }) {

    return (

        <div className={classes.formWrap}>
            <Form method={method} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className={classes.createForm}>
                <input type="text" name="title" placeholder="Title" defaultValue={title ? title : ""} />
                <textarea name="desc" placeholder="Description" defaultValue={desc ? desc : ""}></textarea>
                <div className={classes.button}>
                    <button>{method === "POST" ? "CREATE  " : "EDIT"} &nbsp; <AiOutlineFileAdd />
                    </button>
                </div>
            </Form>
        </div>

    )
}

export async function actionCreateEdit({ request, params }) {
    const method = request.method;
    console.log("method", method)
    try {
        const data = await request.formData();
        const dataFormNames = {
            "title": data.get("title"),
            "desc": data.get("desc"),
        };

        //todo form validation

        let url = "http://localhost:8080/api/create";

        if (method === "PATCH") {
            url = `http://localhost:8080/api/posts/${params.id}`
        }

        const token = getToken();

        const response = await fetch(url, {
            method: method,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "token " + token
             },
            body: JSON.stringify(dataFormNames)
        });

        if (!response.ok) {
            throw { message: response.message || "Error in creating/editing post.", status: response.status || 500 }
        }

        return redirect("/");

    } catch (error) {
        throw { message: error.message || "Error in creating/editing post.", status: error.status || 500 }
    }
}