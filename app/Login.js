//Librerie
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, Image, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Autenticazione
import { auth } from "./Firebase"

//Servizi Firebase

//questi sono offerti da firebase che essendo serverless offre già endpoint prestabiliti
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
//questa è la connessione che va a connettersi al database
import { getDatabase, ref, set } from "firebase/database"


//Stili
import { GlobalStyles } from "./GlobalStyles";



export default function Login({ StatiGlobali }) {

  const { setUserLoaded, tuttiEsercizi } = StatiGlobali


  //Variabili di stato campi Iscrizione e Login
  const [nome, setNome] = useState("");

  const [cognome, setCognome] = useState("");

  const [password, setPassword] = useState("");

  const [ripetiPassword, setRipetiPassword] = useState("");

  const [email, setEmail] = useState("");

  const [errore, setErrore] = useState("");


  const [statoBottone, setStatoBottone] = useState(false);


    const [registrazione, setRegistrazione] = useState(false);

  //REGEX

  //metodo per la validità email
  const isValidEmail = (email) => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
  };
  //metodo per la validità password
  const isValidPassword = (password) => {
    const regex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

    return regex.test(password);
  };


  //--------------------------------------------------------------------------------

  //Gestione creazione utente

  const handleCreazioneAccount = () => {
  //metodo per la creazione email e password che deve riccevere come parametri appunto queste due più l'auth
    createUserWithEmailAndPassword(auth, email, password)
      //se esistono crea credenziali utente con questi parametri
      .then((datiUtente) => {
        //connessione al database
        const db = getDatabase();
        //Scrittura nel database
        set(
          ref(db, "users/" + datiUtente.user.uid),
          //qui si specificano i campi aggiuntivi che si creeeranno al momento della registrazione
          {
            nome: nome,
            cognome: cognome,
            email: email,
            password: password,
          }
        )
          //Se tutto va bene
          .then((resp) => {
            console.log("dati salvati", resp);
            //setta che l'utente è stato registrato e loggato
            setUserLoaded(true);
          })
          .catch((error) => {
            console.error("errore nel salvataggio utente", error);
          });
        const user = datiUtente.user;
        console.log("nuovo utente: ", user)
        handleLogin()
      })
      .catch((error) => {
        console.error("errore nell'auth", error)
        Alert.alert(error.message)
    })
}

  //-----------------------------------------------------------------------

  //Gestione log-in

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((datiUtente) => {
        console.log("entrato")
        const user = datiUtente.user
        console.log("utente: ", user)
      })
      .catch((error) => {
      console.error("erroe nel login", error)
    })
}



  //USE-EFFECT

  useEffect(() => {
    //   Se questi campi sono diversi da vuoti
    if (nome !== "" && cognome !== "" && email !== "" && password !== "") {
      // Se il parametro email passato non rispetta la regex
      if (!isValidEmail(email)) {
        setErrore("Compila con un'email valida");
        //   Altrimenti
      } else {
        // Se il campo password passato alla regex non è valido
        if (!isValidPassword(password)) {
          setErrore("Compila con una password valida");
          //   Altrimenti
        } else {
          //   se il campo password non è uguale al campo ripeti password
          if (password !== ripetiPassword) {
            setErrore("Le password inserite non corrispondono");
            //   e lascia il pulsante disbilitato
            setStatoBottone(false);
          }
          //altrimenti se tutto va a buon fine
          else {
            setErrore("");
            setStatoBottone(true);
          }
        }
      }
    } else {
      //Altrimenti se ci sono degli errori
      // console.log("pulsante inoperabile a causa di errore", errore);
      setStatoBottone(false);
    }

    // impostare nell'array di dipendenza i campo del form,perché vogliamo che le variabili di stato si aggiornino ogni volta che queste vengono modificate
  }, [nome, cognome, email, password, ripetiPassword]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={GlobalStyles.container}>
          <View style={[styles.container, GlobalStyles.container]}>
            {registrazione && (
              <>
                <View style={styles.contenitoreRegistrazione}>
                  {/*FORM DI REGISTAZIONE  */}

                  <View style={styles.containerScelta}>
                    <Text style={styles.titolo}>Modulo Di Registrazione</Text>
                  </View>

                  <TextInput
                    style={GlobalStyles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={cognome}
                    onChangeText={setCognome}
                    placeholder="Cognome"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={ripetiPassword}
                    onChangeText={setRipetiPassword}
                    placeholder="Ripeti Password"
                  />

                  <TouchableOpacity
                    style={[styles.btn, { opacity: statoBottone ? 1 : 0.3 }]}
                    disabled={!statoBottone}
                    onPress={handleCreazioneAccount}
                  >
                    <Text style={styles.testoBtn}>Conferma Registrazione</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setRegistrazione(false)}
                  >
                    <Text style={styles.testoBtn}>
                      Passa a Log-in se registrato
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {!registrazione && (
              <>
                <View style={styles.contenitoreRegistrazione}>
                  {/*FORM DI REGISTAZIONE  */}

                  <View style={styles.containerScelta}>
                    <Text style={styles.titolo}>Login</Text>
                  </View>

                  <TextInput
                    style={GlobalStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={ripetiPassword}
                    onChangeText={setRipetiPassword}
                    placeholder="Ripeti Password"
                  />

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handleLogin}
                  >
                    <Text style={styles.testoBtn}>Conferma Log-in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setRegistrazione(true)}
                  >
                    <Text style={styles.testoBtnShift}>
                  Se non sei registarto clicca qui
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  //Contenitori

  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },

  contenitoreRegistrazione: {
    backgroundColor: "#D3D3D3",
    width: "80%",
    padding: 15,
  },

  containerScelta: {
    marginTop: 10,
    borderColor: "white",
    borderWidth: 2,
  },

  //Testo

  testoBtn: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#1A1A2E",
  },

  titolo: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },

  testoBtnShift: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#1A1A2E",
  },

  //Bottone
  btn: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 14,
    borderRadius: 10,
  },
});