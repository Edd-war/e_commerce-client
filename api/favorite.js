import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export async function isFavoriteApi(idUser, idGame, logout) {
    try{
        const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
        const result = await authFetch(url, null, logout);
        return await result.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addFavoriteApi(idUser, idGame, logout) {
    try{
        const dataFound = await isFavoriteApi(idUser, idGame, logout);
        if(size(dataFound) === 0){
            const url = `${BASE_PATH}/favorites`;
            const params = {
                method: "POST",
            };
            const responseCreate = await authFetch(url, params, logout);
            const dataCreate = await responseCreate.json();
            console.log(await dataCreate);
            return await dataCreate;
        } else {
            console.log("El juego ya está en tu lista de favoritos");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}