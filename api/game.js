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