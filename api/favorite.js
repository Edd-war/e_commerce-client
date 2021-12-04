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
            return await setFavoriteApi(dataCreate.id ,idUser, idGame, logout);
        } else {
            console.log("El juego ya está en tu lista de favoritos");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function setFavoriteApi(idFav, idUser, idGame, logout) {
    try{
        const url = `${BASE_PATH}/favorites/${idFav}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: idUser, game: idGame}),
        };
        const responseUpdate = await authFetch(url, params, logout);
        const dataUpdate = await responseUpdate.json();
        console.log(await dataUpdate);
        return await dataUpdate;
    }  catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
    try{
        const dataFound = await isFavoriteApi(idUser, idGame, logout);
        if(size(dataFound) > 0){
            const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const responseDelete = await authFetch(url, params, logout);
            const dataDelete = await responseDelete.json();
            // console.log(await dataDelete);
            return await dataDelete;
        } else {
            console.log("El juego no está en tu lista de favoritos");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}