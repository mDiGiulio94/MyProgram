import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
//AsyncStorage o Local storage sono sinonimi e servono ricorda per la PERSISTENZA dati come  in questo caso l'autenticazione
import AsyncStorage from "@react-native-async-storage/async-storage";

import { firebaseConfig } from "../firebase-config";

//Variabile che memorizzerà il serivizio di autenticazione di Firebase
let auth

//se nessuna app è avviata
if (getApps().length === 0) {
//Avvia una nuova app Firebase, con le configurazioni prese da firebaseConfig (file vicino al JSON)
    const app = initializeApp(firebaseConfig)

    //Impostazione della persistenza, qui si definisce che se per esempio un utente è loggato viene memorizzato in async Storage e rende lo stato persistente tra più sessioni (finché non si slogga)
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    } )


}
//Se l'applicazione è già inizializzata prendi la sessione corrente
else {
    const app = getApp();


    //Qui si tenta di generare il servizio di autenticazione nell'app, se non è stato ancora creato, l'inizializzazione procede come prima con l'asyncStorage
    auth = getAuth(app) || initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    })
}

export { auth }