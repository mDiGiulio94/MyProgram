//Import librerie
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform, Image, StyleSheet } from "react-native";

//Import icone
import  { Ionicons } from '@expo/vector-icons'

//Import autenticazione
import { auth } from "../Firebase";
//listener e metodo di log out
import { onAuthStateChanged, signOut } from "firebase/auth";
//ref serve per puntare alla tabella e al database get invece è uno dei metodi del database (come delate ecc..)
import { getDatabase, ref, get } from "firebase/database";

export default function Header({ StatiGlobali }) {


    //Destrutturaizione della variabile userLoaded per verificare se l'user è loggato o no
const { userLoaded } = StatiGlobali;

    //variabili di stato
    const [user, setUser] = useState(null);

    //metodo di gestione logout
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
            setUser(null)
            }).catch((error) => {
            console.error("questo è l'errore in header per logout: ", error)
        })
    }


    return (
      <>
        <View style={styles.header}>
          <View>
            <Text>MyProgram</Text>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="exit-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </>
    );

}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#D3D3D3",
    paddingTop: 10,
    },
    
    
});