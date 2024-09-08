import React, { useState, useEffect } from "react";
import { Text,View, Image, StyleSheet,ScrollView,TouchableOpacity,} from "react-native";

//Stili
import { GlobalStyles } from "./GlobalStyles";

//pagine
import Footer from "./Components/Footer";

//Icone
import RemoveEsercizio from "react-native-vector-icons/MaterialCommunityIcons";

//Import Firebase, del Database e delle Crud
import { getDatabase, ref, remove } from "firebase/database";

//Import dello storage il ref è per non condonderlo col ref del database
import{  ref as storageRef, deleteObject } from 'firebase/storage'
import { storage } from "./Firebase";


export default function TuttiGliEsercizi({ StatiGlobali, navigation }) {

  const { tuttiEsercizi, userId, PrendiEsercizi, setDettEsercizio } =
    StatiGlobali;

// Prova a recuperare l'id tramite una funzione simile
  const handleDettaglio = (esercizio) => {
    setDettEsercizio(esercizio);
    console.log(esercizio);
    navigation.navigate("EserciziDettaglio");
  };


  const deleteEsercizio = (itemId, immagineUrl) => {



    const db = getDatabase();
    const esercizioRef = ref(
      db,
      "users/" + userId + "/tuttiEsercizi/" + itemId
    );
    remove(esercizioRef)
      .then(() => {
        console.log("esercizio rimosso con successo");
        deleteImg(immagineUrl)
        PrendiEsercizi();
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
  const eserciziArray = Object.values(tuttiEsercizi || {});

  return (
    <>
      {eserciziArray.length > 0 || null ? (
        <>
          <View style={GlobalStyles.container}>
            <View style={styles.containerScelta}>
              <Text style={styles.titolo}>Tutti Gli Esercizi Disponibili</Text>
            </View>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
              {eserciziArray.map((esercizio, index) => (
                <View style={styles.cards} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDettaglio(esercizio);
                    }}
                  >
                    <Image
                      source={{ uri: esercizio.immagine }}
                      style={styles.ImgSced}
                    />

                    <View>
                      <Text style={styles.testo}>{esercizio.nome}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contenitoreBtn}>
                    <TouchableOpacity
                      style={styles.Icone}
                      onPress={() => {
                        navigation.navigate("ModificaEsercizio", {
                          esercizio: esercizio,
                          //aggiungo origine per differenziazione
                          origine: true
                        });
                      }}
                    >
                      <Text style={styles.testoCard}>Modifica</Text>
                      <RemoveEsercizio name="file-edit-outline" size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.Icone}
                      onPress={() => {
                        deleteEsercizio(
                          esercizio.id,
                          esercizio.immagine,
                          esercizio.nome
                        );
                      }}
                    >
                      <Text style={styles.testoCard}>Rimuovi</Text>
                      <RemoveEsercizio name="file-remove-outline" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <Footer pag="esercizi" />
        </>
      ) : (
        <>
          <View style={GlobalStyles.container}>
            <TouchableOpacity
              style={[styles.vuoto]}
              onPress={() => {
                navigation.navigate("AggiungiEsercizio");
              }}
            >
              <Text style={styles.titolo}>
                Non ci sono esercizi, poi iniziare inserendoli qui!
              </Text>
            </TouchableOpacity>
          </View>
          <Footer pag="esercizi" />
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
    width: "45%",
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
