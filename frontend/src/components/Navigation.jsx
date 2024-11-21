import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

export default function Navigation(){

    return(
        <nav className={classes.navStyle}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/create">Create Post</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}