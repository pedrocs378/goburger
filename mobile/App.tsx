import React from 'react';
import { 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins'

import Routes from './src/routes/Routes';
import { AppLoading } from 'expo';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <Routes />
}