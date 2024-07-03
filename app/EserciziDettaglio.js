//Librerie e Componenti
import React from "react";
import { View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,} from "react-native";

//Navigazione
import { useRoute } from "@react-navigation/native";

//pagine
import Footer from "./Components/Footer";

//Stili
import { GlobalStyles } from "./GlobalStyles";

export default function EserciziDettaglio() {
  //Navigazione
  const route = useRoute();
  const { categoria } = route.params;

    return (
      <>
        <ScrollView style={GlobalStyles.container}>
          <View style={styles.containerScelta}>
            <Text style={styles.titolo}>Elenco Esercizi Disponibili</Text>
          </View>

          <View style={styles.cardsContainer}>
            {categoria.esercizi.map((esercizio, index) => (
              <View style={styles.cards} key={index}>
                <Image source={esercizio.immagine} style={styles.ImgSced} />
                <Text style={styles.testo}>{esercizio.nome}</Text>
              </View>
            ))}
          </View>
            </ScrollView>
            <Footer pag="esercizi" />
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
    width: "45%",
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