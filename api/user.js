import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function registerApi(formData) {
    // console.log(formData);
    try {
        const url = `${BASE_PATH}/auth/local/register`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params)
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function loginApi(formData) {
    // console.log(formData);
    try {
        const url = `${BASE_PATH}/auth/local`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params)
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function resetPasswordApi(email) {
    // console.log(email);
    try {
        const url = `${BASE_PATH}/auth/forgot-password`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        };
        const response = await fetch(url, params)
        const result = await response.json();
        // console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMeApi(logout) {
    try {
        const url = `${BASE_PATH}/users/me`;
        const result = await authFetch(url, {}, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateMeApi(idUser, formData, logout) {
    try {
        const url = `${BASE_PATH}/users/${idUser}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };
        const result = await authFetch(url, params, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}