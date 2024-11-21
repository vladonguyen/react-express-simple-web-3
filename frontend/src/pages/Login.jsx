import { Form } from "react-router-dom";

export default function Login(){

    return(
        <Form method="post">
            <h1>Login</h1>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Login</button>
        </Form>
    )
}