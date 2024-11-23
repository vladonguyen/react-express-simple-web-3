import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./Navigation.module.css";

export default function Navigation() {
    const token = useRouteLoaderData("routetoken");

    return (
        <nav className={classes.navStyle}>
            <NavLink to="/">Home</NavLink>
            {token && <NavLink to="/create">Create Post</NavLink>}
            {!token && <NavLink to="/register">Register</NavLink>}
            {!token && <NavLink to="/login">Login</NavLink>}
        </nav>
    )
}