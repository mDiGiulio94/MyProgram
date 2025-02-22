//Librerie e Componenti
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";


//navigazione
import { useNavigation } from "@react-navigation/native";

//Stili
import { GlobalStyles } from "./GlobalStyles";

//Componenti
import MyTable from "./Components/Tabella"
import Footer from "./Components/Footer";



export default function DettaglioScheda({ StatiGlobali }) {
 
  const { dettScheda, userId, PrendiEsercizi} =
    StatiGlobali;

  const navigation = useNavigation();

  return (
    <>
      <View style={GlobalStyles.container}>
        <View style={styles.containerScelta}>
          <Text style={styles.titolo}>Personalizza Scheda</Text>
        </View>
        <ScrollView>
          <MyTable
            dettScheda={dettScheda}
            userId={userId}
            PrendiEsercizi={PrendiEsercizi}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("SalvaScheda")}
          style={styles.saveButton}
        >
          <Text>Salva PDF</Text>
        </TouchableOpacity>
      </View>

      <Footer pag="DettaglioScheda" dettScheda={dettScheda} />
    </>
  );
}

const styles = StyleSheet.create({
  containerScelta: {
    marginTop: 10,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 10,
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

  saveButton: {
    margin: 10,
    alignSelf: "center",
    backgroundColor: "#DDDDDD",
    padding: 8, // Ridotto il padding
    borderRadius: 5,
  },
});
