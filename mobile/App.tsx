import React from 'react';
import { 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins'
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';

import { store } from './src/store/storeConfig'
import Routes from './src/routes/Routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store} >
      <StatusBar translucent />
      <Routes />
    </Provider>
  )
}