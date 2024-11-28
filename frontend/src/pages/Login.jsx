import classes from "./Login.module.css";

import { Form, redirect } from "react-router-dom";

import { AiOutlineLogin } from "react-icons/ai";


export default function Login() {

    return (
        <div className={classes.formWrap}>
            <Form method="post" className={classes.loginForm}>
                <h1>Login</h1>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <div className={classes.button}>
                    <button>LOGIN &nbsp; <AiOutlineLogin />
                    </button>
                </div>
            </Form>
        </div>
    )
}

export async function actionLogin({ request }) {
    try {
        const data = await request.formData();
        const loginData = {
            email: data.get("email"),
            password: data.get("password")
        };

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });
        const resData = await response.json();
        const token = resData.token;
        localStorage.setItem("token", token);
        return redirect("/");
    } catch (error) {
        throw (error.message || "Error login.")
    }
    // todo fix auto login without any credentials

}