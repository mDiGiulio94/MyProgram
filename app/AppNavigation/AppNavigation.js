import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native";


//Import pagine
import Home from "../Home"
import CategorieEsercizi from "../CategorieEsercizi"
import EserciziDettaglio from "../EserciziDettaglio"
import Footer from "../Components/Footer"
import AggiungiCategorie from "../AggiungiCategorie"
import Login from "../Login"
import Header from "../Components/Header"
import TuttiGliEsercizi from "../TuttiGliEsercizi"
import AggiungiEsercizio from "../AggiungiEsercizio"

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
            <Stack.Screen name="CategorieEsercizi">
              {(props) => (
                <CategorieEsercizi {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="EserciziDettaglio">
              {(props) => (
                <EserciziDettaglio {...props} StatiGlobali={StatiGlobali} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AggiungiCategorie">
              {(props) => (
                <AggiungiCategorie {...props} StatiGlobali={StatiGlobali} />
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