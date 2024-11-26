import Navigation from "./Navigation";

import classes from "./Header.module.css";
import { Link } from "react-router-dom";

import { MdMarkUnreadChatAlt } from "react-icons/md";

export default function Header(){

    return(
        <header className={classes.mainHeader}>
        <div className="logo">
       <Link to="/" className={classes.logo}> <h1>Notes Manager <MdMarkUnreadChatAlt />
       </h1> </Link>   
        </div>
        <Navigation />
        </header>
    )
}