import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

// Import icone
import Delete from "react-native-vector-icons/Feather";

// Import navigazione
import { useNavigation } from "@react-navigation/native";

// Import Firebase, del Database e delle Crud
import { getDatabase, ref, onValue, remove } from "firebase/database";

// Import dello storage il ref è per non condonderlo col ref del database
import { ref as storageRef, deleteObject } from "firebase/storage";
import { storage } from "../Firebase";

export default function MyTable({ dettScheda, userId, PrendiEsercizi }) {

  //Imposta esercizi array come un array appunto
  const [eserciziArray, setEserciziArray] = useState([]);
  
  const navigation = useNavigation();

  const deleteEsercizio = (itemId, immagineUrl) => {
    const db = getDatabase();
    const esercizioRef = ref(
      db,
      `users/${userId}/SchedeAllenamenti/${dettScheda.id}/esercizio/${itemId}`
    );
    remove(esercizioRef)
      .then(() => {
        console.log("Esercizio rimosso con successo");
        deleteImg(immagineUrl);
        PrendiEsercizi(); // Se hai bisogno di aggiornare qualcos'altro
      })
      .catch((error) => {
        console.error("Errore nella rimozione: ", error);
      });
  };

  const deleteImg = async (immagineUrl) => {
    try {
      const imgRef = storageRef(storage, immagineUrl);
      await deleteObject(imgRef);
      console.log("Immagine eliminata dallo storage");
    } catch (error) {
      console.error("Errore nell'eliminazione", error);
    }
  };

  // Imposta un listener per gli esercizi
  useEffect(() => {
    const db = getDatabase();
    const eserciziRef = ref(
      db,
      `users/${userId}/SchedeAllenamenti/${dettScheda.id}/esercizio`
    );
/*OnValue di firebase fa si di impostare un listener che tiene costantemente traccia del nodo nel database, e ad ogni sua modifica questo fa si di aggiornare anche l'interfaccia utente automaticamente */
    const unsubscribe = onValue(eserciziRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEserciziArray(Object.values(data));
      } else {
        setEserciziArray([]); // Se non ci sono esercizi, imposta l'array vuoto
      }
    });

    // Pulizia del listener quando il componente viene smontato, questo fa si che il listener onValue appunto smetta di funzionare allo smontare della pagina
    return () => unsubscribe();
    //nell'array di dipendenze ci sono user id e dettScheda.id che sono i due valori che al loro cambiamento, attiveranno la funzione specificata, con user id si fa si che cambiando user non si portano dati contenuti da altri user, mentre con dettScheda.id si fa in modo che ci sia differenziazione tra le diverse schede e non si aggiungano esercizi in zone non volute
  }, [userId, dettScheda.id]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.head}>
          <View style={[styles.containerHead, styles.firstColumn]}>
            <Image
              source={{ uri: dettScheda.immagine }}
              style={styles.ImgSced}
            />
          </View>
          <View style={[styles.containerHead, styles.column]}>
            <Text style={styles.textHead}>
              Cliente: {dettScheda.nomeCliente}
            </Text>
            <Text style={styles.textHead}>
              Tipologia Scheda: {dettScheda.tipologia}
            </Text>
            <Text style={styles.textHead}>
              Sedute Settimanali: {dettScheda.seduteSettimanali}
            </Text>
          </View>
          <View style={[styles.containerHead, styles.column]}>
            <Text style={styles.textHead}>
              Durata Scheda: {dettScheda.durata}
            </Text>
            <Text style={styles.textHead}>
              Scadenza Scheda: {dettScheda.scadenza}
            </Text>
            <Text style={styles.textHead}>
              Personal Trainer: {dettScheda.personal}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.row1]}>
            <Text style={styles.textVuoto}>Giorno 1</Text>
          </View>
          <View style={styles.table}>
            {/* Intestazione della tabella */}
            <View style={[styles.row]}>
              <Text style={styles.textVuoto}></Text>

              <Text style={styles.textHead2}>Nome</Text>

              <Text style={styles.textHead2}>Serie</Text>
              <Text style={styles.textHead2}>Ripetizioni</Text>
              <Text style={styles.textHead2}>Intensità</Text>
              <Text style={styles.textHead2}>Recupero</Text>

              <Text style={styles.textVuoto1}></Text>
            </View>
            {/* Dati degli esercizi */}
            {eserciziArray.map((esercizio, index) => (
              <View style={styles.row} key={index}>
                <Image
                  source={{ uri: esercizio.immagine }}
                  style={styles.tableImg}
                />
                <Text style={styles.firstColumnText}>{esercizio.nome}</Text>
                <Text style={styles.firstColumnText}>{esercizio.serie}</Text>
                <Text style={styles.text2}>{esercizio.ripetizioni}</Text>
                <Text style={styles.text3}>{esercizio.intensita}</Text>
                <Text style={styles.text3}>{esercizio.recupero}</Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteEsercizio(esercizio.id, esercizio.immagine);
                  }}
                  style={styles.deleteButton}
                >
                  <Delete name="x" size="20" color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AggiungiEsercizio", {
                fromDettaglioScheda: true,
              })
            }
            style={styles.addButton}
          >
            <Text>Aggiungi Esercizio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flexDirection: "column",
    padding: 10, // Ridotto il padding
  },
  head: {
    flexDirection: "row",
    marginBottom: 10, // Ridotto lo spazio tra la testa e il corpo
  },
  containerHead: {
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#f1f8ff",
  },
  textHead: {
    fontWeight: "bold",
    fontSize: 8, // Ridotta la dimensione del testo
  },
  textHead2: {
    fontWeight: "bold",
    fontSize: 8, // Ridotta la dimensione del testo
    textAlign: "center",
    flex: 1.5, // Aumentato leggermente il flex delle colonne di testo per allinearle
    margin: 1,
  },
  textVuoto: {
    flex: 1.8,
  },
  textVuoto1: {
    flex: 1.4,
  },
  firstColumnText: {
    margin: 4, // Ridotto il margine
    textAlign: "center",
    flex: 1.8, // Aumentato lo spazio per la prima colonna
    fontSize: 8, // Ridotta la dimensione del testo
  },
  text2: {
    margin: 4, // Ridotto il margine
    textAlign: "center",
    flex: 1,
    fontSize: 8, // Ridotta la dimensione del testo
  },
  text3: {
    margin: 4, // Ridotto il margine
    textAlign: "center",
    flex: 2.4,
    fontSize: 8, // Ridotta la dimensione del testo
  },
  firstColumn: {
    width: "20%",
  },
  column: {
    flex: 1,
  },
  ImgSced: {
    width: "100%",
    height: 60, // Ridotte le dimensioni dell'immagine
    resizeMode: "cover",
  },
  body: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    padding: 3, // Ridotto il padding
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3, // Ridotto il padding
    width: 70,
    backgroundColor: "#f1f8ff",
  },
  addButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#DDDDDD",
    padding: 8, // Ridotto il padding
    borderRadius: 5,
  },

  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  table: {
    borderColor: "black",
    borderWidth: 1,
  },
  tableImg: {
    width: 60, // Aumentate le dimensioni dell'immagine nella tabella
    height: 60, // Aumentate le dimensioni dell'immagine nella tabella
    marginRight: 5, // Ridotto il margine a destra
    resizeMode: "cover", // Mantieni la proporzione dell'immagine
  },
});
