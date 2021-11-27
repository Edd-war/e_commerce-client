import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
    const token = getToken();
    if (!token) {
        logout();
    } else {
        if(hasExpiredToken(token)){
            // console.log("Token has expired");
            logout();
        } else {
            // console.log("Token is valid");
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const response = await fetch(url, paramsTemp);
                // const result = await response.json();
                // console.log(response);
                return response;
            } catch (error) {
                return error;
                
            }
        }
    }
}