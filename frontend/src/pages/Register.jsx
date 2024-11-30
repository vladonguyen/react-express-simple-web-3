import { Form, redirect, useActionData } from "react-router-dom";
import classes from "./Register.module.css";

import { AiOutlineUserAdd } from "react-icons/ai";


export default function Register() {
    const errors = useActionData();
    console.log(errors)
    
    return (
        <>
            <h1>Register</h1>
            <div className={classes.formWrap}>            
            <Form method="post" className={classes.registerForm}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" minLength={6} />
                <input type="password" name="repassword" placeholder="Re-type password" minLength={6} />
                {errors && <div className={classes.errors}>
                        {errors.message}
                        </div>}
                <div className={classes.button}>
                <button>REGISTER <AiOutlineUserAdd />
                </button>
                </div>
                
            </Form>
            </div>
        </>
    )
}

6

export async function registerAction({ request }) {
    
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


            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Something went wrong with registration!")
             
            }

            const {email, token} = await response.json();


            localStorage.setItem("token", token);

            return redirect("/");
        } catch (error) {
            
            return  error
        }

}