//Librerie
import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";


//Stili
import { GlobalStyles } from "./GlobalStyles";

//Pagine


export default function Home({StatiGlobali}) {

  const Registro = require("../assets/images/Allenamenti.jpg");
  const Scheda = require("../assets/images/Stampa-scheda.jpg");

  const navigation = useNavigation();


  return (
    <ScrollView style={GlobalStyles.container}>
      <View style={styles.containerScelta}>
        <Text style={styles.titolo}>Scegli l'opzione desiderata:</Text>
      </View>

      {/* PRIMA RIGA DI SCHEDA */}
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.cards}>
          <Image source={Registro} style={styles.ImgSced} />
          <Text style={styles.testo}>Compila Scheda Allenamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cards}>
          <Image source={Scheda} style={styles.ImgSced} />
          <Text style={styles.testoDx}>Schede Clienti</Text>
        </TouchableOpacity>
      </View>

      {/* SECONDA RIGA DI SCHEDA */}
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.cards}
          onPress={() => navigation.navigate("CategorieEsercizi")}
        >
          <Image source={Scheda} style={styles.ImgSced} />
          <Text style={styles.testoDx}>Categorie Esercizi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cards}
          onPress={() => navigation.navigate("AggiungiCategorie")}
        >
          <Image source={Scheda} style={styles.ImgSced} />
          <Text style={styles.testo}>Aggiungi Nuove Cartegorie</Text>
        </TouchableOpacity>
      </View>

      {/* TERZA RIGA DI SCHEDA */}
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.cards}
          onPress={() => navigation.navigate("TuttiGliEsercizi")}
        >
          <Image source={Registro} style={styles.ImgSced} />
          <Text style={styles.testo}>Tutti Gli Esercizi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cards}>
          <Image source={Scheda} style={styles.ImgSced} />
          <Text style={styles.testo}>Schede Clienti</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScelta: {
    marginTop: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cards: {
    flex: 1,
    borderColor: "white",
    borderWidth: 2,
    marginHorizontal: 5,
    backgroundColor: "#D3D3D3",
  },
  // Testo
  testo: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
  },
  testoDx: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
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


/*
ROADMAP


1) CREARE HOME CON SCHEDE DI NAVIGAZIONE

----------------------------------------------------------------------------

2) COMPILA SCHEDA CON FORM PER INSERIRE UN NUOVO ALLENAMENTO:

- Il form deve dare la possibilità di selezionare un utente esistente o di aggiungerne uno nuovo

- deve far scegliere il tipo di esercizio tramite una selezione (non select ma una spunta poi cerca come si chiama penso sia radiale) e aggiungerli alla voce utente 


--------------------------------------------------------------------------------

*/