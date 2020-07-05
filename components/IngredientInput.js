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

const IngredientInput = (props) => {
  const [ingredient, setIngredient] = useState('');

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
      <View style={{ flex: 4 }}>
        <TextInput
          value={ingredient}
          onChangeText={(ingredient) => setIngredient(ingredient)}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={props.onPress.bind(this, ingredient, setIngredient)}
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
});

export default IngredientInput;
