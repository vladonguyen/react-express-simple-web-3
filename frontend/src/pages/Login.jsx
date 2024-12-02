import classes from "./Login.module.css";

import { Form, redirect, useActionData, useRouteError } from "react-router-dom";

import { AiOutlineLogin } from "react-icons/ai";


export default function Login() {
const errors = useActionData();
    console.log("errors", errors?.message)

    return (
        <div className={classes.formWrap}>
            <Form method="post" className={classes.loginForm}>
                <h1>Login</h1>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                {errors && <div className={classes.errors}>
                    {errors.message}
                </div>
                }
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
        
        if(!response.ok){
            throw new Error(resData.message || "Login failed.")
        }
   
        const token = resData.token;
        localStorage.setItem("token", token);

        //expiration for auto logout after 1h
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
        
        return redirect("/");
    } catch (error) {
        return error
    }
    // todo fix auto login without any credentials

}