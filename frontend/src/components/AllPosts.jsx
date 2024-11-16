import { Link } from "react-router-dom";

export default function AllPosts({id, title, desc}){

    return(
        <Link to={`posts/${id}`}>
        <div key={id}>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
        </Link>
    )
}