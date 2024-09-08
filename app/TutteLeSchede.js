import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//Stili
import { GlobalStyles } from "./GlobalStyles";

//pagine
import Footer from "./Components/Footer";

//Icone
import RemoveScheda from "react-native-vector-icons/MaterialCommunityIcons";

//Import Firebase, del Database e delle Crud
import { getDatabase, ref, remove } from "firebase/database";

//Import dello storage il ref è per non condonderlo col ref del database
import { ref as storageRef, deleteObject } from "firebase/storage";
import { storage } from "./Firebase";

/*

ANCHE QUI FUNZIONA TUTTO MA CHIEDI A DANILO PERCHè IN QUESTO CASO QUANDO PASSO I PARAMETRI AL
PULSANTE SE IMMAGINE NON STA DOPO ID IL PERCORSO NON FUNZIONA

*/

export default function TutteLeSchede({ StatiGlobali, navigation }) {


    const { schede, userId, PrendiSchede, setDettScheda } =
    StatiGlobali;


  const handleDettaglio = (scheda) => {
    setDettScheda(scheda);
    console.log(scheda);
    navigation.navigate("DettaglioScheda");
  };

  const deleteScheda = (itemId, immagineUrl) => {
    const db = getDatabase();
    const schedeRef = ref(
      db,
      "users/" + userId + "/SchedeAllenamenti/" + itemId
    );
    remove(schedeRef)
      .then(() => {
        console.log("esercizio rimosso con successo");
        deleteImg(immagineUrl);
        PrendiSchede();
      })
      .catch((error) => {
        console.error("errore nella rimozione: ", error);
      });
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

  //Trasformazione di oggetto in array, e lo prende anche se fosse oggetto vuoto
  const eserciziArray = Object.values(schede || {});

  return (
    <>
      {eserciziArray.length > 0 || null ? (
        <>
          <View style={GlobalStyles.container}>
            <View style={styles.containerScelta}>
              <Text style={styles.titolo}>Tutte le schede create</Text>
            </View>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
              {eserciziArray.map((scheda, index) => (
                <View style={styles.cards} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDettaglio(scheda);
                    }}
                  >
                    <Image
                      source={{ uri: scheda.immagine }}
                      style={styles.ImgSced}
                    />

                    <View>
                      <Text style={styles.testo}>{scheda.tipologia}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contenitoreBtn}>
                    <TouchableOpacity
                      style={styles.Icone}
                      onPress={() => {
                        navigation.navigate("ModificaScheda",   {
                          scheda: scheda,
                          origineY : true
                        });
                      }}
                    >
                      <Text style={styles.testoCard}>Modifica</Text>
                      <RemoveScheda name="file-edit-outline" size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.Icone}
                      onPress={() => {
                        deleteScheda(scheda.id, scheda.immagine, scheda.nome);
                      }}
                    >
                      <Text style={styles.testoCard}>Rimuovi</Text>
                      <RemoveScheda name="file-remove-outline" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <Footer pag="TutteLeSchede" />
        </>
      ) : (
        <>
          <View style={GlobalStyles.container}>
            <TouchableOpacity
              style={[styles.vuoto]}
              onPress={() => {
               navigation.navigate("CreaScheda", {origineX : "TutteLeSchede"});

              }}
            >
              <Text style={styles.titolo}>
                Non ci sono schede, poi iniziare inserendole qui!
              </Text>
            </TouchableOpacity>
          </View>
          <Footer pag="TutteLeSchede"  />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  //Contenitori

  containerScelta: {
    marginTop: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  cards: {
    width: "100%",
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 20,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 5,
    marginTop: 10,
  },

  vuoto: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    borderWidth: 1,
    borderColor: "white",
    padding: 20,
    width: "85%",
  },

  contenitoreBtn: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 5,
  },

  //Testi

  testo: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    padding: 5,
  },
  titolo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },

  testoCard: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },

  //Immagine
  ImgSced: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  //Pulsanti
  Icone: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    padding: 5,
  },
});
