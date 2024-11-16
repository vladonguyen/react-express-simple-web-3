import { Form, redirect } from "react-router-dom";

export default function CreateEditForm({ method }) {

    return (
        <>
            <Form method={method} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="desc" placeholder="Description"></textarea>
                <button>Submit</button>
            </Form>
        </>
    )
}

export async function actionCreateEdit({ request, params }) {
    try {
        const data = await request.formData();
        const dataFormNames = {
            "title": data.get("title"),
            "desc": data.get("desc"),
        };

        //todo form validation

        let url = "http://localhost:8080/api/create";

        const response = await fetch(url, {
            method: request.method,
            headers: { "Content-Type": "application/json" },
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