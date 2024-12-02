import { redirect } from "react-router-dom";

export function getToken(){
    const tokenDuration = getTokenDuration();

    if (tokenDuration <0){
        localStorage.removeItem("expiration");
        localStorage.removeItem("token");
    }
    const token = localStorage.getItem("token");

    return token
}

export function deleteToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    return redirect("/");
}

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function checkLoginStatus(){
    const token = getToken();
    if(!token){
        return redirect("/login");
    }
    return null;
}