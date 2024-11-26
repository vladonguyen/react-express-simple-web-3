import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";

import classes from "./RootLayout.module.css";

export default function RootLayout() {
let token = useLoaderData();
console.log("token router", token);

    return (
    
        <div className={classes.wrapper}>
            <Header />
            <Outlet />
            </div>
    )
}