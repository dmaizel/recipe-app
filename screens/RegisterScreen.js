import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as authActions from '../store/actions/auth';

// import Fire from '../Fire';
// import UserPermissions from '../utilities/UserPermissions';
// import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handlePickAvatar = async () => {
    // UserPermissions.getCameraPermission();

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    // });

    if (!result.cancelled) {
      setUser({ ...user, avatar: result.uri });
    }
  };

  const handleSignUp = async () => {
    try {
      await dispatch(authActions.singup(email, password));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'></StatusBar>

      <Image
        source={require('../assets/authHeader.png')}
        style={{ marginTop: -116, marginLeft: -50 }}
      />

      <TouchableOpacity
        style={styles.back}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name='ios-arrow-round-back' size={32} color='#FFF'></Ionicons>
      </TouchableOpacity>

      <Image
        source={require('../assets/authFooter.png')}
        style={{ position: 'absolute', bottom: -325, right: -225 }}
      />

      <KeyboardAvoidingView enabled behavior='position'>
        <View
          style={{
            position: 'absolute',
            top: 64,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text
            style={styles.greeting}
          >{`Hello!\nSign up to get started.`}</Text>
          <Image
            source={require('../assets/undraw_cooking_lyxy.png')}
            style={{ ...styles.image, marginTop: 0, alignSelf: 'center' }}
          />
          {/* <TouchableOpacity
          style={styles.avatarPlaceHolder}
          onPress={handlePickAvatar}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Ionicons
            name='ios-add'
            size={40}
            color='#FFF'
            style={{ marginTop: 6, marginLeft: 2 }}
          ></Ionicons>
        </TouchableOpacity> */}
        </View>

        <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={(name) => setUser({ ...user, name: name })}
              value={user.name}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={(email) => setUser({ ...user, email: email })}
              value={user.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={(password) =>
                setUser({ ...user, password: password })
              }
              value={user.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 32,
          }}
          onPress={() => props.navigation.navigate('Login')}
        >
          <Text style={{ color: '#414959', fontSize: 13 }}>
            Already a member?{' '}
            <Text style={{ fontWeight: 'bold', color: '#E9446A' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: -270,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48 ,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceHolder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
