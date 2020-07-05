import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status != 'granted') {
      Alert.alert(
        'Insuficcient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={[styles.imagePicker, { ...props.style }]}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <View>
            {/* <Text>No image picked yet.</Text> */}
            <TouchableHighlight onPress={takeImageHandler}>
              <Icon name='add-a-photo' size={90} />
            </TouchableHighlight>
          </View>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    minHeight: 90,
    minWidth: 90,
    width: '100%',
    height: '100%',
  },
});

export default ImgPicker;
