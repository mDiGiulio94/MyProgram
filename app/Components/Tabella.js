import React from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";


import { useNavigation } from "@react-navigation/native";

export default function MyTable({ dettScheda }) {


const navigation = useNavigation()

  const tableData = [
    ["1, 2", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
  ];

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
              Nome Cliente: {dettScheda.nomeCliente}
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
              Nome Personal Trainer: {dettScheda.personal}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          {tableData.map((rowData, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {rowData.map((cellData, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.cell}
                  onPress={() =>
                    navigation.navigate("AggiungiEsercizio", {
                      fromDettaglioScheda: true,
                    })
                  }
                >
                  <Text style={styles.text}>{cellData}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
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
    padding: 20,
  },
  head: {
    flexDirection: "row",
    marginBottom: 20,
  },
  containerHead: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
  textHead: {
    fontWeight: "bold",
    fontSize: 10,
  },
  firstColumn: {
    width: "20%",
  },
  column: {
    flex: 1,
    marginLeft: 5,
  },
  ImgSced: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  body: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#FFF1C1",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#C1C0B9",
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
