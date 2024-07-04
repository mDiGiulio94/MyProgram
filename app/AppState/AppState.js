//Import Librerie
import React, { useState, useEffect } from "react";

//Import Navigazione
import AppNavigation from "../AppNavigation/AppNavigation";

//Import di autenticazione e crud per Firebase
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

export default function AppState() {
  //Contiene Tutte le Categorie
  const [categorie, setCategorie] = useState([]);
  //Contenuto singola categoria
  const [categoria, setCategoria] = useState([]);
  //Variabile per definire se l'utente è loggato o meno
  const [userLoaded, setUserLoaded] = useState(false);
  //Variabile che immagazzina l'id utente fatta l'identificazione
  const [userId, setUserId] = useState(null);
  //Variabile che contiene tutti gli esercizi
  const [tuttiEsercizi, setTuttiEsercizi] = useState([])
  //Variabile che contiene il dettaglio
  const [dettEsercizio, setDettEsercizio] = useState([])
  //Variabile che contiene gli esercizi di tutti
  const [eserciziDiTutti, setEserciziDiTutti] = useState([])

  //Metodo per presa e stampa delle categorie
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


  //Metodo che prende gli esercizi di default dalla tabella ESERCIZI
  const PrendiEserciziDiTutti = () => {
    const db = getDatabase();
    const eserciziTuttiRef = ref(db, "esercizi");

    get(eserciziTuttiRef).then((snapShot) => {

      console.log(snapShot.val())
      if (snapShot.exists) {
        setEserciziDiTutti(snapShot.val())

      } else {
        console.log("non ci sono esercizi")
        setEserciziDiTutti([])
      }
    })
  }

  //Metodo per la presa e stampa DEGLI ESERCIZI DALLA TABELLA DEGLI UTENTI

  const PrendiEsercizi = () => {
    //connssione al database
    const db = getDatabase();
    //percorso di riferimento
    const eserciziRef = ref(db, "users/" + auth.currentUser.uid + "/tuttiEsercizi")
    //presa della tabella categorie e copia con snapshot
    get(eserciziRef).then((snapShot) => {
      if (snapShot.exists) {
        //assegna a tutti esercizi il valore della copia
        setTuttiEsercizi(snapShot.val())
      } else {
        console.log("non ci sono esercizi sul db")
        setTuttiEsercizi([])
      }
    }).catch((error) => {
      console.error(error)
    })
  }



  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      if (user) {
        PrendiCategorie();
        PrendiEsercizi();
        PrendiEserciziDiTutti();
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
    PrendiCategorie,
    userLoaded,
    setUserLoaded,
    userId,
    setUserId,
    tuttiEsercizi,
    setTuttiEsercizi,
    dettEsercizio,
    setDettEsercizio,
    PrendiEsercizi,
    eserciziDiTutti,
    setEserciziDiTutti
  };

  return <AppNavigation StatiGlobali={StatiGlobali} />;
}
