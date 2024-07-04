//Librerie e Componenti
import React from "react";
import { View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,} from "react-native";

//Icone
import AddList from "react-native-vector-icons/MaterialIcons"
import RemoveList from "react-native-vector-icons/MaterialIcons";
import AddEsercizio from "react-native-vector-icons/MaterialCommunityIcons";
import RemoveEsercizio from "react-native-vector-icons/AntDesign";

//navigazione
import { useNavigation } from "@react-navigation/native";


export default function Footer({ pag }) {
    const navigation = useNavigation();

    return (
      <>
        {pag === "categorie" && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.contenitore}
              onPress={() => navigation.navigate("AggiungiCategorie")}
            >
              <AddList name="format-list-bulleted-add" size={30} />
              <Text style={styles.text}>Add Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contenitore}>
              <RemoveList name="playlist-remove" size={30} />
              <Text style={styles.text}>Remove Category</Text>
            </TouchableOpacity>
          </View>
        )}
        {pag === "esercizi" && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.contenitore} onPress={() => { navigation.navigate("AggiungiEsercizio") }}>
              <AddEsercizio name="file-plus-outline" size={30} />
              <Text style={styles.text}>Aggiungi Esercizio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contenitore} onPress={() => { navigation.navigate("Home") }}>
              <RemoveEsercizio name="back" size={30} />
              <Text style={styles.text}>Torna Indietro</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#D3D3D3",
    paddingTop: 10,
  },
  contenitore: {
    alignItems: "center",
  },
  text: {
      fontSize: 12,
      fontWeight: "bold"
  },
});