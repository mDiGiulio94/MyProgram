import { CATEGORIE } from "../Mock/CategorieMock";
import axios from "axios";



//Chiamata al mock
async function getCategorie() {
    try {
        const response = await CATEGORIE
        return response
    } catch (error) {
        console.log(error)
    }
}


const CategorieApi = {

    getCategorie: getCategorie

}

export default CategorieApi