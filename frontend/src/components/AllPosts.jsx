import { Link } from "react-router-dom";

import classes from "./Allposts.module.css";

export default function AllPosts({ id, title, desc }) {

    return (
        <div className={classes.singleNote}>
            <Link to={`posts/${id}`}>
                <div key={id}>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
            </Link>
        </div>
    )
}