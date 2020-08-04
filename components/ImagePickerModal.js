import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

const ImagePickerModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(props.showModal);
  const canBeEdited = props.canBeEdited;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressOut={() => {
        setIsModalVisible(false);
        props.setShowModal(false);
      }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
        <View
          style={{
            backgroundColor: '#fff',
            margin: 50,
            borderRadius: 10,
            marginTop: 300,
            height: 200,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              borderBottomColor: 'black',
              flex: 1,
              borderBottomWidth: 2,
              marginBottom: 10,
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: 25,
            }}
          >
            <Text style={{ fontSize: 24, color: '#1569C7' }}>Add Photo!</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={props.takeImageHandler}
              style={{ ...styles.buttonStyle, marginTop: 0 }}
            >
              <Text style={{ fontSize: 22, color: 'black' }}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.chooseImageHandler}
              style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 22, color: 'black' }}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                props.setShowModal(false);
              }}
              style={styles.buttonStyle}
            >
              <Text style={{ fontSize: 22, color: 'black' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ImagePickerModal;

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
