import { redirect } from "react-router-dom";

export function getToken(){
    const token = localStorage.getItem("token");
    return token
}

export function deleteToken(){
    localStorage.removeItem("token");
    return redirect("/");
}

export function checkLoginStatus(){
    const token = getToken();
    if(!token){
        return redirect("/login");
    }
    return null;
}