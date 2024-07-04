import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from "react-native";

//Stili
import { GlobalStyles } from "./GlobalStyles";

import { getDatabase, ref, set, push } from "firebase/database";

//navigazione
import { useNavigation } from "@react-navigation/native";




export default function AggiungiEsercizio({StatiGlobali}) {

    const { userId, PrendiEsercizi } = StatiGlobali;

  const navigation = useNavigation();

  //Variabili di stato
  const [nome, setNome] = useState("");

  const [descrizione, setDescrizione] = useState("");

  const [immagine, setImmagine] = useState("");

  // Metodo per aggiunta di un nuovo esercizio
  const salvaEsercizio = async () => {
    try {
      // instaurare connessione al database
      const db = getDatabase();
      // crea la reference
      const esercizioRef = ref(db, "users/" + userId + "/tuttiEsercizi");
      // crea il nuovo id
      const newEsercizioRef = push(esercizioRef);

      // Il push necessita di una ref e un body quindi
      const body = {
        id: newEsercizioRef.key.toString(),
        nome: nome,
        descrizione: descrizione,
        immagine: immagine,
        data: Date.now(),

      };

      await set(newEsercizioRef, body);
      console.log("dati esercizio caricati");
      PrendiEsercizi();
      navigation.navigate("TuttiGliEsercizi");
    } catch (error) {
      console.error("errore nel salvataggio", error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={GlobalStyles.container}>
          <View style={[styles.container, GlobalStyles.container]}>
            <View style={styles.contenitoreRegistrazione}>
              {/*FORM DI AGGIUNTA ESERCIZIO  */}

              <View style={styles.containerScelta}>
                <Text style={styles.titolo}>
                  Compila i dati per il nuovo esercizio
                </Text>
              </View>

              <TextInput
                style={GlobalStyles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome Esercizio"
              />

              <TextInput
                style={GlobalStyles.input}
                value={immagine}
                onChangeText={setImmagine}
                placeholder="Carica Immagine"
              />

              <TextInput
                style={[GlobalStyles.input, styles.inputTesto]}
                value={descrizione}
                onChangeText={setDescrizione}
                placeholder="Breve Descrizione"
                multiline={true}
              />

              <TouchableOpacity
                style={[styles.btn]}
                onPress={salvaEsercizio}
              >
                <View>
                  <Text style={styles.testoBtn}>Aggiungi</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
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
      width: "50%",
      alignSelf:"center"

  },

  inputTesto: {
    height: 150,
  },
})