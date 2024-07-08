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
  ScrollView,
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

//Import icone
import AddImmagine from "react-native-vector-icons/MaterialIcons";


export default function CreaScheda({ StatiGlobali }) {


    const { userId, PrendiSchede } = StatiGlobali;

  const navigation = useNavigation();

  //Variabili di stato
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipsFinali, setTipsFinali] = useState("");
    const [immagineUrl, setImmagineUrl] = useState("");
    const [tipologia, setTipologia] = useState("")
    const [seduteSettimanali, setSeduteSettimanali] = useState("")
    const [durata, setDurata] = useState("")
    const [scadenza, setScadenza] = useState("")
      const [personal, setPersonal] = useState("");

  //VARIABILE DI STATO CHE MEMORIZZA L'IMMAGINE PRESA DALL'UTENTE
  const [newImage, setNewImage] = useState(null);

  // Metodo per aggiunta di un nuovo esercizio
  const salvaScheda = async () => {
    try {
      // Se c'è una nuova immagine, caricala e aggiorna l'URL
      let imageUrl = immagineUrl;
      if (newImage) {
        imageUrl = await uploadImage(newImage.uri);
      }

      // instaurare connessione al database
      const db = getDatabase();
      // crea la reference
      const schedaRef = ref(db, "users/" + userId + "/SchedeAllenamenti");
      // crea il nuovo id
      const newSchedaRef = push(schedaRef);

      // Il push necessita di una ref e un body quindi
      const body = {
        id: newSchedaRef.key.toString(),
        nomeCliente: nomeCliente,
          tipsFinali: tipsFinali,
        tipologia: tipologia,
          immagine: imageUrl,
          seduteSettimanali: seduteSettimanali,
          durata: durata,
          scadenza: scadenza,
        personal:personal,
        data: Date.now(),
      };

      await set(newSchedaRef, body)
        .then(() => {
          console.log("dati scheda caricati");
          PrendiSchede();
          navigation.navigate("TutteLeSchede");
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
        `imagesSchede/${filename}`
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
    setTipsFinali("");
      setNomeCliente("");
      setTipologia("")
      setImmagineUrl("");
      setSeduteSettimanali("");
      setDurata("");
      setScadenza("");
      setPersonal("");
    if (immagineUrl) {
      deleteImg(immagineUrl);
    }
    setNewImage(null); // Resetta anche la nuova immagine
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={GlobalStyles.container}>
          <View style={styles.containerScelta}>
            <Text style={styles.titolo}>Compila la nuova scheda</Text>
          </View>
          <View style={[styles.container, GlobalStyles.container]}>
            <View style={styles.contenitoreRegistrazione}>
              {/*FORM DI CREAZIONE SCHEDA  */}

              <TextInput
                style={GlobalStyles.input}
                value={nomeCliente}
                onChangeText={setNomeCliente}
                placeholder="Nome Cliente"
              />

              <TextInput
                style={GlobalStyles.input}
                value={tipologia}
                onChangeText={setTipologia}
                placeholder="Tipo di allenamento"
              />

              <TextInput
                style={GlobalStyles.input}
                value={seduteSettimanali}
                onChangeText={setSeduteSettimanali}
                placeholder="Numero Sedute settimanali"
                keyboardType="numeric"
              />

              <TextInput
                style={GlobalStyles.input}
                value={durata}
                onChangeText={setDurata}
                placeholder="Durata allenamento"
              />

              <TextInput
                style={GlobalStyles.input}
                value={scadenza}
                onChangeText={setScadenza}
                placeholder="Data prevista fine scheda"
              />

              <TextInput
                style={GlobalStyles.input}
                value={personal}
                onChangeText={setPersonal}
                placeholder="Nome Personal Trainer"
              />

              <View style={styles.aggiuntaImg}>
                <TextInput
                  style={[GlobalStyles.input, styles.inputImg]}
                  value={newImage ? newImage.uri : immagineUrl}
                  onChangeText={setImmagineUrl}
                  placeholder="Aggiungi Url"
                />
                <TouchableOpacity onPress={selezioneImmagine}>
                  <AddImmagine
                    name="add-photo-alternate"
                    style={styles.icona}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                style={[GlobalStyles.input, styles.inputTesto]}
                value={tipsFinali}
                onChangeText={setTipsFinali}
                placeholder="Brevi tips finali"
                multiline={true}
              />

              <View style={styles.containerBottoni}>
                <TouchableOpacity style={[styles.btn]} onPress={salvaScheda}>
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
      <Footer pag="NuovaScheda" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
        marginBottom: 10,
marginTop: 10
  },

  contenitoreRegistrazione: {
    backgroundColor: "#D3D3D3",
    width: "85%",
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
    color: "white",
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
    height: 130,
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
