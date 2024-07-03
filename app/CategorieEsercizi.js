import React, { useState, useEffect } from "react";
import { Text,View,TouchableOpacity,Image,StyleSheet,ScrollView,} from "react-native";
import { useNavigation } from "@react-navigation/native";

//API
import CategorieApi from "./Api/CategorieApi";

//Stili
import { GlobalStyles } from "./GlobalStyles";

//Pagine
const Registro = require("../assets/images/Allenamenti.jpg");
import Footer from "./Components/Footer";


export default function CategorieEsercizi( { StatiGlobali }) {
  //prendo da stati globali il contenitore di tutte le categorie
  const { categorie } = StatiGlobali;

  // Verifica se le categorie sono passate correttamente


  // Variabili di stato
  // const [categorie, setCategorie] = useState([]);

  //Navigazione
  const navigation = useNavigation();

  // Funzioni e Logiche
  // richiamo l'api del mock
  // async function generaCategorie() {
  //   try {
  //     const categorie = await CategorieApi.getCategorie();
  //     setCategorie(categorie);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // UseEffect
  // useEffect(() => {
  //   generaCategorie();
  // }, []);

  //siccome in firebase stiamo utilizzanto oggetti, i dati vanno prima trasformati in array tramite questo metodo
  const categorieArray = Object.values(categorie);

return (
  <>
    {categorieArray.length > 0 ? (
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.containerScelta}>
          <Text style={styles.titolo}>
            Scegli la categoria da visualizzare:
          </Text>
        </View>

        {categorieArray?.map((categoria, index) => (
          <View style={styles.rowContainer} key={index}>
            <TouchableOpacity
              style={styles.cards}
              onPress={() =>
                navigation.navigate("EserciziDettaglio", {
                  categoria,
                })
              }
            >
              <Image source={categoria.immagine} style={styles.ImgSced} />
              <Text style={styles.testo}>{categoria.nome}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Footer pag="categorie" />
      </ScrollView>
    ) : (
      <View style={GlobalStyles.container}>
        <Text style={styles.titolo}>Non ci sono categorie</Text>
      </View>
    )}
  </>
);

}

const styles = StyleSheet.create({
  containerScelta: {
    marginVertical: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cards: {
    padding:7,
    width: "100%",
      backgroundColor: "#D3D3D3",
  },
  testo: {
    color: "#1A1A2E",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
  },
  ImgSced: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  titolo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
});
