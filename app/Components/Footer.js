//Librerie e Componenti
import React, {useState} from "react";

import { View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,} from "react-native";

//Icone
import AddList from "react-native-vector-icons/MaterialIcons"
import RemoveList from "react-native-vector-icons/MaterialIcons";
import AddEsercizio from "react-native-vector-icons/MaterialCommunityIcons";
import RemoveEsercizio from "react-native-vector-icons/AntDesign";
import List from "react-native-vector-icons/MaterialCommunityIcons";

//navigazione
import { useNavigation } from "@react-navigation/native";


export default function Footer({ pag, dettEsercizio, dettScheda, fromDettaglioScheda, fromDettaglioScheda1, origine, origineX, origineY }) {
  const navigation = useNavigation();

  //Funzione che differenzia l'origine
  const TornaIndietro = () => {
    if (origine) {
      //quando origine sarà true il pulsante indietro porta a tutti gli esercizi
      navigation.navigate("TuttiGliEsercizi");
    } else {
      //quando è false riporta al dettaglio di provenienza
      navigation.navigate("EserciziDettaglio");
    }
  };

  //Funzione che differenzia l'origine
  const TornaIndietro2 = () => {
    if (origineY) {
      //quando origine sarà true il pulsante indietro porta a tutti gli esercizi
      navigation.navigate("TutteLeSchede");
    } else {
      //quando è false riporta al dettaglio di provenienza
      navigation.navigate("DettaglioScheda");
    }
  };

  const TornaIndietro1 = () => {
    if (origineX === "TutteLeSchede") {
      navigation.navigate("TutteLeSchede");
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <>
      {/* Footer categorie */}

      {/* Footer esercizi */}

      {/* ----------------------------FUNZIONA CORRETTAMENTE------------------------------------------------- */}

      {pag === "esercizi" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("AggiungiEsercizio");
            }}
          >
            <AddEsercizio name="file-plus-outline" size={30} />
            <Text style={styles.text}>Aggiungi Esercizio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <RemoveEsercizio name="back" size={30} />
            <Text style={styles.text}>Torna Indietro</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ---------------------------------------------------------------- */}

      {/* Footer dettaglio Esercizi */}

      {/* --------------------------FUNZIONA CORRETTAMENTE------------------------------------------------------ */}

      {pag === "Dettaglioesercizi" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("ModificaEsercizio", {
                esercizio: dettEsercizio,
              });
            }}
          >
            <AddEsercizio name="file-edit-outline" size={30} />
            <Text style={styles.text}>Modifica Esercizio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("TuttiGliEsercizi");
            }}
          >
            <RemoveEsercizio name="back" size={30} />
            <Text style={styles.text}>Torna Indietro</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ----------------------------------------------------------------------------------- */}

      {/* FOOTER AGGIUNGI ESERCIZI */}

      {/* ----------------------FUNZIONA CORRETTAMENTE------------------------------------------ */}

      {pag === "Nuovoesercizio" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <AddEsercizio name="home" size={30} />
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>

          {fromDettaglioScheda && (
            <TouchableOpacity
              style={styles.contenitore}
              onPress={() => {
                navigation.navigate("DettaglioScheda");
              }}
            >
              <RemoveEsercizio name="back" size={30} />
              <Text style={styles.text}>Torna Indietro</Text>
            </TouchableOpacity>
          )}

          {!fromDettaglioScheda && (
            <TouchableOpacity
              style={styles.contenitore}
              onPress={() => {
                navigation.navigate("TuttiGliEsercizi");
              }}
            >
              <RemoveEsercizio name="back" size={30} />
              <Text style={styles.text}>Torna Indietro</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ------------------------------------------------------------------------------------- */}

      {/* FOOTER MODIFICA ESERCIZIO */}

      {/* ----------------------------Funziona Correttamente---------------------------------------------------- */}
      {pag === "ModificaEsercizio" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <AddEsercizio name="home" size={30} />
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contenitore} onPress={TornaIndietro}>
            <RemoveEsercizio name="back" size={30} />
            <Text style={styles.text}>Torna Indietro</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* --------------------------------------------------------------------------------------- */}

      {/* FOOTER NUOVA SCHEDA */}

      {/* ----------------------Funziona Correttamente --------------------------------------------- */}

      {pag === "NuovaScheda" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("TutteLeSchede");
            }}
          >
            <List name="format-list-bulleted" size={30} />
            <Text style={styles.text}>Tutte le schede</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contenitore} onPress={TornaIndietro1}>
            <RemoveEsercizio name="back" size={30} />
            <Text style={styles.text}>Torna Indietro</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FOOTER TUTTE LE SCHEDE */}

      {/*---------------------Funziona Correttamente----------------------------  */}

      {pag === "TutteLeSchede" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("CreaScheda", {
                origineX: "TutteLeSchede",
              });
            }}
          >
            <AddEsercizio name="file-plus-outline" size={30} />
            <Text style={styles.text}>Crea Scheda</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <RemoveEsercizio name="back" size={30} />
            <Text style={styles.text}>Torna Indietro</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FOOTER MODIFICA SCHEDA */}

      {pag === "ModificaScheda" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <AddEsercizio name="home" size={30} />
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>

        
            <TouchableOpacity
              style={styles.contenitore}
              onPress={TornaIndietro2}
            >
              <RemoveEsercizio name="back" size={30} />
              <Text style={styles.text}>Torna Indietro</Text>
            </TouchableOpacity>
        </View>
      )}

      {/* Footer dettaglio Scheda */}

      {/* -----------------------------Funziona Correttamente------------------------------------- */}

      {pag === "DettaglioScheda" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("ModificaScheda", {
                scheda: dettScheda,
              });
            }}
          >
            <AddEsercizio name="file-edit-outline" size={30} />
            <Text style={styles.text}>Modifica Scheda</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contenitore}
            onPress={() => {
              navigation.navigate("TutteLeSchede", {
                fromDettaglioScheda1: true,
              });
            }}
          >
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