import { useRouteError } from "react-router-dom"

export default function Error(){
const error = useRouteError();
    return (
        <div>
            <p>Message: {error.message}</p>
            <p>Status: {error.status}</p>
        </div>
    )
}