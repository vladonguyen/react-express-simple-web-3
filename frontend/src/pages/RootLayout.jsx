import { Outlet } from "react-router-dom";
import Home from "./Home";

export default function RootLayout(){

    return(
        <>
       <Outlet />
        </>
    )
}