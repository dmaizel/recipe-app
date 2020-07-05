import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const Ingredient = (props) => {
  const [ingredient, setIngredient] = useState(props.ingredient);

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
          style={{ backgroundColor: 'transparent', textAlign: 'left' }}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={props.onPress.bind(this, ingredient)}
          style={{ flex: 1, justifyContent: 'space-between' }}
        >
          <Image
            source={require('../assets/closeIcon.png')}
            style={{ width: 30, height: 30, flex: 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Ingredient;
