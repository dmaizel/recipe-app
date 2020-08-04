import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePickerModal from './ImagePickerModal';

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(
    props.pickedImage ? props.pickedImage : null
  );

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
    if (!image.cancelled) {
      setPickedImage(image.uri);
      props.onImageTaken(image.uri);
    }
    setShowModal(false);
  };

  const chooseImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.cancelled) {
      setPickedImage(image.uri);
      props.onImageTaken(image.uri);
    }
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={[styles.imagePicker, { ...props.style, flex: 1 }]}>
      <View
        style={{
          ...styles.imagePreview,
          flex: 1,
        }}
      >
        {!pickedImage ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <Text>No image picked yet.</Text> */}
            {/* <TouchableHighlight onPress={takeImageHandler}>
              <Icon name='add-a-photo' size={90} />
            </TouchableHighlight>             */}
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Icon name='add-a-photo' size={90} />
            </TouchableOpacity>
            <Modal
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}
              animationType='fade'
            >
              <ImagePickerModal
                setShowModal={setShowModal}
                showModal={showModal}
                chooseImageHandler={chooseImageHandler}
                takeImageHandler={takeImageHandler}
              />
            </Modal>
          </View>
        ) : (
          // <View style={{ flex: 1, width: '100%' }}>
          //   <TouchableOpacity onPress={() => setShowModal(true)}>
          //     <Image style={styles.image} source={{ uri: pickedImage }} />
          //   </TouchableOpacity>
          // </View>
          <View styles={{ flex: 1 }}>
            {/* <Text>No image picked yet.</Text> */}
            {/* <TouchableHighlight onPress={takeImageHandler}>
              <Icon name='add-a-photo' size={90} />
            </TouchableHighlight>             */}
            <TouchableOpacity
              onLongPress={() => {
                Alert.alert(
                  'Delete',
                  'Are you sure you want to delete this photo?',
                  [
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: () => {
                        props.onImageRemoved(pickedImage);
                        setPickedImage(null);
                      },
                    },
                    {
                      text: 'Cancel',
                    },
                  ]
                );
              }}
            >
              <Image
                style={{ ...styles.image }}
                source={{ uri: pickedImage }}
              />
            </TouchableOpacity>
            <Modal
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}
              animationType='fade'
            >
              <ImagePickerModal
                setShowModal={setShowModal}
                showModal={showModal}
                chooseImageHandler={chooseImageHandler}
                takeImageHandler={takeImageHandler}
              />
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    flex: 1,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    minHeight: 90,
    minWidth: 90,
    width: '100%',
    height: '100%',
  },
  buttonStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    paddingLeft: 20,
    paddingBottom: 5,
  },
});

export default ImgPicker;
