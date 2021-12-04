import { BASE_PATH } from "../utils/constants";

export async function getLastGamesApi(limit){
    try{
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=createdAt:DESC`;
        const url = `${BASE_PATH}/games?${limitItems}&${sortItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export async function getGamesPlatformApi(platform, limit, start){
    try{
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=createdAt:DESC`;
        const startItems = `_start=${start}`;
        const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export async function getTotalGamesPlatformApi(platform){
    try{
        const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export async function getGameByUrlApi(path){
    try{
        const urlFinal = `${BASE_PATH}/games?url=${path}`;
        const response = await fetch(urlFinal);
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export async function searchGamesApi(search){
    try{
        const url = `${BASE_PATH}/games?_q=${search}`;
        const response = await fetch(url);
        const result = await response.json();
        // console.log(result);
        return result;
    }
    catch(error){
        console.log(error);
        return [];
    }
}