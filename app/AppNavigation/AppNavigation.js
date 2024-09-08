import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native";


//Import pagine
import Home from "../Home"
import EserciziDettaglio from "../EserciziDettaglio"
import Footer from "../Components/Footer"
import Login from "../Login"
import Header from "../Components/Header"
import TuttiGliEsercizi from "../TuttiGliEsercizi"
import AggiungiEsercizio from "../AggiungiEsercizio"
import ModificaEsercizio from "../ModificaEsercizio"
import CreaScheda from "../CreaScheda"
import TutteLeSchede from "../TutteLeSchede"
import ModificaScheda from "../ModificaScheda"
import DettaglioScheda from "../DettaglioScheda"
import SalvaScheda from "../SalvaScheda"

//gestione Autenticazione
import { auth } from "../Firebase";

//Import che controlla il cambio di stato de auth (autenticato o no)
import { onAuthStateChanged } from "firebase/auth";


const Stack = createNativeStackNavigator()

export default function AppNavigation({ StatiGlobali }) {

  const [user, setUser] = useState(null);

  //Use-EFFECT
  useEffect(() => {
    //onAuthStateChaged è un listener
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscibe; //clean up per rimuovere il listener, se l'utente è loggato non richiede di loggare di nuovo
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D3D3D3" }}>
      {user && (
        <>
          <Header StatiGlobali={StatiGlobali} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} StatiGlobali={StatiGlobali} />}
            </Stack.Screen>
            <Stack.Screen name="EserciziDettaglio">
              {(props) => (
                <EserciziDettaglio {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="TuttiGliEsercizi">
              {(props) => (
                <TuttiGliEsercizi {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AggiungiEsercizio">
              {(props) => (
                <AggiungiEsercizio {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="ModificaEsercizio">
              {(props) => (
                <ModificaEsercizio {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="CreaScheda">
              {(props) => <CreaScheda {...props} StatiGlobali={StatiGlobali} />}
            </Stack.Screen>
            <Stack.Screen name="TutteLeSchede">
              {(props) => (
                <TutteLeSchede {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="ModificaScheda">
              {(props) => (
                <ModificaScheda {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="DettaglioScheda">
              {(props) => (
                <DettaglioScheda {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="SalvaScheda">
              {(props) => (
                <SalvaScheda {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </>
      )}

      {!user && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} StatiGlobali={StatiGlobali} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}

      <Footer StatiGlobali={StatiGlobali} />
    </SafeAreaView>
  );
}