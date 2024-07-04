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

export default function TuttiGliEsercizi({ StatiGlobali }) {

  const { tuttiEsercizi, userId, PrendiEsercizi } = StatiGlobali;


  const deleteEsercizio = (itemId) => {
    const db = getDatabase()
    const esercizioRef = ref(db, "users/" + userId + "/tuttiEsercizi/" + itemId)

   console.log("questo è esercizioREf", esercizioRef)
    remove(esercizioRef).then(() => {
      console.log("esercizio rimosso con successo")
      PrendiEsercizi()
    }).catch((error) => {
      console.error("errore nella rimozione: ", error)
    })

}



  //Trasformazione di oggetto in array
  const eserciziArray = Object.values(tuttiEsercizi);

  return (
    <>
      {eserciziArray.length > 0 ? (
        <>
          <View style={GlobalStyles.container}>
            <View style={styles.containerScelta}>
              <Text style={styles.titolo}>Tutti Gli Esercizi Disponibili</Text>
            </View>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
              {eserciziArray.map((esercizio, index) => (
                <View style={styles.cards} key={index}>
                  <Image
                    source={{ uri: esercizio.immagine }}
                    style={styles.ImgSced}
                  />
                  <View>
                    <Text style={styles.testo}>{esercizio.nome}</Text>
                  </View>
                  <View style={styles.contenitoreBtn}>
                    <TouchableOpacity style={styles.Icone}>
                      <Text style={styles.testoCard}>Modifica</Text>
                      <RemoveEsercizio name="file-edit-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.Icone}
                      onPress={() => {deleteEsercizio(esercizio.id, esercizio.nome)}}
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
            <View style={[styles.vuoto]}>
              <Text style={styles.titolo}>Non ci sono esercizi</Text>
            </View>
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
    height: "100%",
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
