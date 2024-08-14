import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";

//Stili
import { GlobalStyles } from "./GlobalStyles";

import { getDatabase, ref, set, push } from "firebase/database";

//navigazione
import { useNavigation } from "@react-navigation/native";

//Import image picker di expo
import * as ImagePicker from "expo-image-picker";

//Import dello storage il ref è per non condonderlo col ref del database
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "./Firebase";

//Import Footer
import Footer from "./Components/Footer";

//useRoute per il passaggio di dati
import { useRoute } from "@react-navigation/native";

//Import icone
import AddImmagine from "react-native-vector-icons/MaterialIcons";

export default function AggiungiEsercizio({ StatiGlobali }) {
  const { userId, PrendiEsercizi, dettScheda} = StatiGlobali;

  const navigation = useNavigation();

  console.log( "questo è dettScheda in Aggiungi esercizio", dettScheda)

  //route per differenziare l'accesso se da tutti gli esercizi o se da dettaglio scheda
  const route = useRoute();
  const fromDettaglioScheda = route.params?.fromDettaglioScheda || false;

  //Variabili di stato
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [immagineUrl, setImmagineUrl] = useState("");
  const [serie, setSerie] = useState("");
  const [ripetizioni, setRipetizioni] = useState("")
  const [recupero, setRecupero] = useState("");
    const [intensita, setIntensita] = useState("");

  //VARIABILE DI STATO CHE MEMORIZZA L'IMMAGINE PRESA DALL'UTENTE
  const [newImage, setNewImage] = useState(null);

  // Metodo per aggiunta di un nuovo esercizio
  const salvaEsercizio = async () => {
    try {

      // Se c'è una nuova immagine, caricala e aggiorna l'URL
      let imageUrl = immagineUrl;
      if (newImage) {
        imageUrl = await uploadImage(newImage.uri);
      }

      // instaurare connessione al database
      const db = getDatabase();
      // ref esterna perché popolata in base all'if
        let esercizioRef;
      // crea la reference
      if (fromDettaglioScheda) {
        esercizioRef = ref(db, "users/" + userId + "/SchedeAllenamenti/" + dettScheda.id + "/esercizio");

        console.log( "questo è esercizio ref ", esercizioRef)
      } else {
            esercizioRef = ref(db, "users/" + userId + "/tuttiEsercizi");
      }

      // crea il nuovo id
      const newEsercizioRef = push(esercizioRef);

      // Il push necessita di una ref e un body quindi
      const body = {
        id: newEsercizioRef.key.toString(),
        nome: nome,
        descrizione: descrizione,
        immagine: imageUrl,
        serie: serie,
        ripetizioni: ripetizioni,
        recupero: recupero,
        intensita:intensita,
        data: Date.now(),
      };

      await set(newEsercizioRef, body)
        .then(() => {
          console.log("dati esercizio caricati");
            if (fromDettaglioScheda) {
              navigation.navigate("DettaglioScheda");
            } else {
              navigation.navigate("TuttiGliEsercizi");
            }
          PrendiEsercizi();

        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("errore nel salvataggio", error);
    }
  };

  //Metodo della selezione e modifica immagine
  const selezioneImmagine = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!response.canceled) {
      const source = { uri: response.assets[0].uri };
      setNewImage(source); // Imposta la nuova immagine
    }
  };

  //Metodo per l'upload dell'immagine
  const uploadImage = async (uri) => {
    try {
      //aspetta che abbia funzionato la chiamata verso l'uri
      const response = await fetch(uri);
      //blob contenitore di grandi quantità di dati di qualsiasi genere in formato binario
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const storageReference = storageRef(
        storage,
        `imagesEsercizi/${filename}`
      );
      await uploadBytes(storageReference, blob);
      const url = await getDownloadURL(storageReference);
      console.log("immagine caricata", url);
      return url;
    } catch (error) {
      console.error("errore nel caricamento immagine: ", error);
      throw error;
    }
  };

  //Metodo cancellazione immagine dallo storage
  const deleteImg = async (immagineUrl) => {
    try {
      const imgRef = storageRef(storage, immagineUrl);
      await deleteObject(imgRef);
      console.log("immagine eliminata dallo storage");
      setImmagineUrl(null);
    } catch (error) {
      console.error("errore nell'eliminazione", error);
    }
  };

  //Metodo per cancellare tutti i campi del form
  const svuotaCampi = () => {
    setDescrizione("");
    setNome("");
    setSerie("");
    setRecupero("");
    setRipetizioni("");
    setImmagineUrl("");
    setIntensita("")
    if (immagineUrl) {
      deleteImg(immagineUrl);
    }
    setNewImage(null); // Resetta anche la nuova immagine
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
              {fromDettaglioScheda && (
                <>
                  <TextInput
                    style={GlobalStyles.input}
                    value={serie}
                    onChangeText={setSerie}
                    placeholder="Serie"
                  />

                  <TextInput
                    style={GlobalStyles.input}
                    value={ripetizioni}
                    onChangeText={setRipetizioni}
                    placeholder="Numero Ripetizioni"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    value={intensita}
                    onChangeText={setIntensita}
                    placeholder="Intensità"
                  />

                  <TextInput
                    style={GlobalStyles.input}
                    value={recupero}
                    onChangeText={setRecupero}
                    placeholder="Recupero"
                  />
                </>
              )}
              <View style={styles.aggiuntaImg}>
                <TextInput
                  style={[GlobalStyles.input, styles.inputImg]}
                  value={newImage ? newImage.uri : immagineUrl}
                  onChangeText={setImmagineUrl}
                  placeholder="Aggiungi Immagine"
                />
                <TouchableOpacity onPress={selezioneImmagine}>
                  <AddImmagine
                    name="add-photo-alternate"
                    style={styles.icona}
                  />
                </TouchableOpacity>
              </View>

              {!fromDettaglioScheda && (
                <>
                  <TextInput
                    style={[GlobalStyles.input, styles.inputTesto]}
                    value={descrizione}
                    onChangeText={setDescrizione}
                    placeholder="Breve Descrizione"
                    multiline={true}
                  />
                </>
              )}

              <View style={styles.containerBottoni}>
                <TouchableOpacity style={[styles.btn]} onPress={salvaEsercizio}>
                  <Text style={styles.testoBtn}>Aggiungi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn]} onPress={svuotaCampi}>
                  <Text style={styles.testoBtn}>Svuota</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Footer pag="Nuovoesercizio" fromDettaglioScheda={fromDettaglioScheda} />
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

  aggiuntaImg: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerBottoni: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },

  //Bottone
  btn: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 14,
    borderRadius: 10,
    width: "45%",
    alignSelf: "center",
  },

  //INPUT

  inputTesto: {
    height: 150,
  },

  inputImg: {
    width: "85%",
  },

  // Icona
  icona: {
    fontSize: 40,
    color: "white",
    marginTop: 15,
  },
});
