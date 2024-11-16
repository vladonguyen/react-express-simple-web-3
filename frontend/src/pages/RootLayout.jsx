import { Outlet } from "react-router-dom";
import Home from "./Home";
import Navigation from "../components/Navigation";

export default function RootLayout() {

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}