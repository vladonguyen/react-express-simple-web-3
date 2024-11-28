import { Form, redirect } from "react-router-dom";
import classes from "./Register.module.css";

import { AiOutlineUserAdd } from "react-icons/ai";


export default function Register() {

    return (
        <>
            <h1>Register</h1>
            <div className={classes.formWrap}>            
            <Form method="post" className={classes.registerForm}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" minLength={6} />
                <input type="password" name="repassword" placeholder="Re-type password" minLength={6} />
                <div className={classes.button}>
                <button>REGISTER <AiOutlineUserAdd />
                </button>
                </div>
                
            </Form>
            </div>
        </>
    )
}


export async function registerAction({ request }) {
    {
        try {
            const data = await request.formData();
            const registerData = {
                email: data.get("email"),
                password: data.get("password"),
                repassword: data.get("repassword")
            }

            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData)
            });

            response.json();

            if (response.ok) {
                return redirect("/");
            }
        } catch (error) {
            throw { message: error.message || "something went wrong with registering user", status: error.status || 500 }
        }

        return null

    }
}