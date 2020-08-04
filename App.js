import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/es/integration/react';

import MealsNavigator from './navigation/MealsNavigation';
import mealsReducer from './store/reducers/meals';
import authReducer from './store/reducers/auth';

import ReduxThunk from 'redux-thunk';

enableScreens();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['meals', 'auth'],
};

const rootReducer = combineReducers({
  meals: mealsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  const persistedStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <MealsNavigator />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
