//Librerie e Componenti
import React from "react";
import { View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,} from "react-native";


//pagine
import Footer from "./Components/Footer";

//Stili
import { GlobalStyles } from "./GlobalStyles";

export default function EserciziDettaglio({StatiGlobali}) {


  const { dettEsercizio } = StatiGlobali



    return (
      <>
        <ScrollView style={GlobalStyles.container}>
          <View style={styles.containerScelta}>
            <Text style={styles.titolo}>Dettaglio Esercizio</Text>
          </View>

          <View style={styles.cardsContainer}>
            <View style={styles.cards}>
              <Image
                source={{ uri: dettEsercizio.immagine }}
                style={styles.ImgSced}
              />
              <Text style={styles.testo}>{dettEsercizio.nome}</Text>
              <Text>{dettEsercizio.descrizione}</Text>
            </View>
          </View>
        </ScrollView>
        <Footer pag="Dettaglioesercizi" dettEsercizio={dettEsercizio} />
      </>
    );
}

const styles = StyleSheet.create({
  containerScelta: {
    marginTop: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cards: {
    width: "100%",
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 20,
    backgroundColor: "#D3D3D3",
    marginRight: 5,
    marginLeft: 5,
  },
  testo: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    marginTop: 5,
  },
  titolo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  ImgSced: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
});