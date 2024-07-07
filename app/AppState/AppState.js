//Import Librerie
import React, { useState, useEffect } from "react";

//Import Navigazione
import AppNavigation from "../AppNavigation/AppNavigation";

//Import di autenticazione e crud per Firebase
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

export default function AppState() {
  //Variabile per definire se l'utente è loggato o meno
  const [userLoaded, setUserLoaded] = useState(false);
  //Variabile che immagazzina l'id utente fatta l'identificazione
  const [userId, setUserId] = useState(null);
  //Variabile che contiene tutti gli esercizi
  const [tuttiEsercizi, setTuttiEsercizi] = useState([]);
  //Variabile che contiene il dettaglio
  const [dettEsercizio, setDettEsercizio] = useState([]);
  //Variabile che contiene tutte le schede
  const [schede, setSchede] = useState([]);
  //Variabile che contiene il dettaglio
  const [dettScheda, setDettScheda] = useState([]);

  //Metodo per la presa e stampa DEGLI ESERCIZI DALLA TABELLA DEGLI UTENTI

  const PrendiEsercizi = () => {
    //connssione al database
    const db = getDatabase();
    //percorso di riferimento
    const eserciziRef = ref(
      db,
      "users/" + auth.currentUser.uid + "/tuttiEsercizi"
    );
    //presa della tabella categorie e copia con snapshot
    get(eserciziRef)
      .then((snapShot) => {
        if (snapShot.exists) {
          //assegna a tutti esercizi il valore della copia
          setTuttiEsercizi(snapShot.val());
        } else {
          console.log("non ci sono esercizi sul db");
          setTuttiEsercizi([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const PrendiSchede = () => {
    //connssione al database
    const db = getDatabase();
    //percorso di riferimento
    const schedeRef = ref(
      db,
      "users/" + auth.currentUser.uid + "/SchedeAllenamenti"
    );
    //presa della tabella categorie e copia con snapshot
    get(schedeRef)
      .then((snapShot) => {
        if (snapShot.exists) {
          //assegna a tutti esercizi il valore della copia
          setSchede(snapShot.val());
        } else {
          console.log("non ci sono esercizi sul db");
          setSchede([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      if (user) {
        PrendiEsercizi();
        PrendiSchede();
        setUserId(auth.currentUser.uid);
      }
    });
    return unsubscibe;
  }, [userLoaded]);

  const StatiGlobali = {
    userLoaded,
    setUserLoaded,
    userId,
    setUserId,
    tuttiEsercizi,
    setTuttiEsercizi,
    dettEsercizio,
    setDettEsercizio,
    PrendiEsercizi,
    schede,
    setSchede,
    PrendiSchede,
    dettScheda,
    setDettScheda
  };

  return <AppNavigation StatiGlobali={StatiGlobali} />;
}
