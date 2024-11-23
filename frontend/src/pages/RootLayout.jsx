import { Outlet, useLoaderData } from "react-router-dom";
import Home from "./Home";
import Navigation from "../components/Navigation";

export default function RootLayout() {
let token = useLoaderData();
console.log("token router", token);

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}