import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";

//useRoute per il passaggio di dati
import { useRoute } from "@react-navigation/native";

//Stili
import { GlobalStyles } from "./GlobalStyles";

import { getDatabase, ref, update } from "firebase/database";

//navigazione
import { useNavigation } from "@react-navigation/native";

//Import footer
import Footer from "./Components/Footer";

//Import image picker di expo
import * as ImagePicker from "expo-image-picker";

//Import icone
import AddImmagine from "react-native-vector-icons/MaterialIcons";

//Import dello storage il ref è per non condonderlo col ref del database
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "./Firebase";

export default function ModificaScheda({ StatiGlobali }) {
  const route = useRoute();

//route per differenziare l'accesso se da tutti gli esercizi o se da dettaglio scheda
  const fromDettaglioScheda = route.params?.fromDettaglioScheda || false;

  const { scheda, origineY } = route.params;

  const { userId, PrendiSchede, dettScheda } = StatiGlobali;

  const navigation = useNavigation();

  //Variabili di stato
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipsFinali, setTipsFinali] = useState("");
  const [immagine, setImmagine] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [seduteSettimanali, setSeduteSettimanali] = useState("");
  const [durata, setDurata] = useState("");
  const [scadenza, setScadenza] = useState("");
  const [personal, setPersonal] = useState("");

  const [newImage, setNewImage] = useState(null);

  // Metodo per aggiunta di un nuovo scheda
  const modificaSchede = async () => {
    try {
      // instaurare connessione al database
      const db = getDatabase();
      // crea la reference
      let schedeRef;
      if (fromDettaglioScheda) {
        schedeRef = ref(
          db,
          "users/" +
            userId +
            "/SchedeAllenamenti/" +
            dettScheda.id +
            "/esercizio"
        );
      } else {
schedeRef = ref(db, "users/" + userId + "/SchedeAllenamenti/" + scheda.id);
      }

      // Se c'è una nuova immagine, caricala e aggiorna l'URL
      let imageUrl = immagine;
      if (newImage) {
        imageUrl = await uploadImage(newImage.uri);

        // Elimina l'immagine precedente solo dopo aver caricato la nuova immagine con successo
        if (scheda.immagine) {
          await deleteImg(scheda.immagine);
        }
      }

      // update necessita di una ref e un body quindi
      const body = {
        nomeCliente: nomeCliente,
        tipsFinali: tipsFinali,
        immagine: imageUrl,
        tipologia: tipologia,
        seduteSettimanali: seduteSettimanali,
        durata: durata,
        scadenza: scadenza,
        personal: personal,
        data: Date.now(),
      };

      await update(schedeRef, body)
        .then(() => {
          console.log("dati scheda caricati");
          if (fromDettaglioScheda) {
             navigation.navigate("DettaglioScheda");
          } else {
navigation.navigate("TutteLeSchede");
          }
          PrendiSchede();

        })
        .catch((error) => {
          console.error("c'è stato errore, ", error);
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

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const storageReference = storageRef(storage, `imagesSchede/${filename}`);
      await uploadBytes(storageReference, blob);
      const url = await getDownloadURL(storageReference);
      console.log("Immagine caricata", url);
      return url;
    } catch (error) {
      console.error("Errore nel caricamento immagine: ", error);
      throw error;
    }
  };

  //Metodo cancellazione immagine dallo storage
  const deleteImg = async (immagineUrl) => {
    try {
      const imgRef = storageRef(storage, immagineUrl);
      await deleteObject(imgRef);
      console.log("immagine eliminata dallo storage");
    } catch (error) {
      console.error("errore nell'eliminazione", error);
    }
  };

  //useEffect che al caricamento della pagina prende i parametri passati dalla pagina tutti esercizi e li inserisce nei campi form
  useEffect(() => {
    setNomeCliente(scheda.nomeCliente);
    setImmagine(scheda.immagine);
    setTipsFinali(scheda.tipsFinali);
    setTipologia(scheda.tipologia);
    setSeduteSettimanali(scheda.seduteSettimanali);
    setDurata(scheda.durata);
    setScadenza(scheda.scadenza);
    setPersonal(scheda.personal);
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={GlobalStyles.container}>
          <View style={[styles.container, GlobalStyles.container]}>
            <View style={styles.contenitoreRegistrazione}>
              {/*FORM DI MODIFICA scheda  */}

              <View style={styles.containerScelta}>
                <Text style={styles.titolo}>Personalizza il nuovo scheda</Text>
              </View>

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
                placeholder="Sedute settimanali"
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
                  value={newImage ? newImage.uri : immagine}
                  onChangeText={setImmagine}
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
                placeholder="Breve Descrizione"
                multiline={true}
              />

              <TouchableOpacity style={[styles.btn]} onPress={modificaSchede}>
                <View>
                  <Text style={styles.testoBtn}>Aggiungi</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Footer pag="ModificaScheda" origineY={origineY} />
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
    alignSelf: "center",
  },

  inputTesto: {
    height: 150,
  },

  // Icona
  icona: {
    fontSize: 40,
    color: "white",
    marginTop: 15,
  },

  inputImg: {
    width: "85%",
  },
});
