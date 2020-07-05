import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import Colors from '../constants/Colors';

const StepInput = (props) => {
  const [step, setStep] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        width: window.width,
        margin: 10,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#888',
        borderRadius: 10,
        backgroundColor: '#fff',
      }}
    >
      <View style={styles.circle}>
        <Text style={styles.number}>{props.index}</Text>
      </View>
      <View style={{ flex: 4 }}>
        <TextInput
          value={step}
          onChangeText={(step) => setStep(step)}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={props.onPress.bind(this, step, setStep)}
          style={{ flex: 1, justifyContent: 'space-between' }}
        >
          <Image
            source={require('../assets/plusIcon.png')}
            style={{ width: 30, height: 30, flex: 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientField: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  circle: {
    flex: 0.15,
    padding: 10,
    marginRight: 7,
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: Colors.primaryColor,
    alignContent: 'center',
    justifyContent: 'center',
  },
  number: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
});

export default StepInput;
