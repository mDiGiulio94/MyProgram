//Import Librerie
import React, { useState, useEffect } from "react";

//Import Navigazione
import AppNavigation from "../AppNavigation/AppNavigation";

//Import di autenticazione e crud per Firebase
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

export default function AppState() {
  //Contienre Tutte le Categorie
  const [categorie, setCategorie] = useState([]);
  //Contiene tutti gli esercizio
  const [esercizi, setEsercizi] = useState([]);
  //Contenuto singola categoria
  const [categoria, setCategoria] = useState([]);
  //Variabile per definire se l'utente è loggato o meno
  const [userLoaded, setUserLoaded] = useState(false);
  //Variabile che immagazzina l'id utente fatta l'identificazione
  const [userId, setUserId] = useState(null);

  const PrendiCategorie = () => {
    //Connessione al database
    const db = getDatabase();
    //connettiti al database e prendi categori
    const categorieRef = ref(db, "categorie");

    //prendi la tabella categorie fanne una copia e se esiste
    get(categorieRef)
      .then((snapShot) => {
        if (snapShot.exists) {
          //assegna a categorie il valore della copia
          setCategorie(snapShot.val());
        } else {
          console.log("non ci sono categorie alla chiamata sul db");
          setCategorie([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log("Categorie in App state:", categorie);

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      if (user) {
          PrendiCategorie();
          setUserId(auth.currentUser.uid)
      }
    });
    return unsubscibe;
  }, [userLoaded]);

  const StatiGlobali = {
    categorie,
    setCategorie,
    categoria,
    setCategoria,
    esercizi,
    setEsercizi,
    PrendiCategorie,
    userLoaded,
      setUserLoaded,
      userId,
    setUserId
  };

  return <AppNavigation StatiGlobali={StatiGlobali} />;
}
