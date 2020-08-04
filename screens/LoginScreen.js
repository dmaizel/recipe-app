import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
// import * as firebase from 'firebase';
import * as authActions from '../store/actions/auth';

const ImageLoader = (props) => {
  const opacity = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(-300))[0];

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.Image
      onLoad={onLoad}
      {...props}
      style={[
        {
          opacity: opacity,
          transform: [
            {
              scale: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
            {
              translateY: translateY,
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      console.log('Handling login');
      await dispatch(authActions.login(email, password));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'></StatusBar>
      <Image
        source={require('../assets/authFooter.png')}
        style={{ position: 'absolute', bottom: -325, right: -225 }}
      />
      <Image
        source={require('../assets/authHeader.png')}
        style={{ marginTop: -176, marginLeft: -50 }}
      />

      <KeyboardAvoidingView enabled behavior='position'>
        {/* <ImageLoader
          source={require('../assets/undraw_breakfast_psiw.png')}
          style={{ ...styles.image, marginTop: -50, alignSelf: 'center' }}
        /> */}

        <Image
          source={require('../assets/loginLogo.png')}
          style={{ marginTop: -110, alignSelf: 'center' }}
        />

        <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>
        <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={(email) => setEmail(email)}
              value={email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize='none'
              onChangeText={(password) => setPassword(password)}
              value={password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 32 }}
          onPress={() => {
            props.navigation.navigate('Register');
          }}
        >
          <Text style={{ color: '#414959', fontSize: 13 }}>
            New to SocialApp?{' '}
            <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: -32,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
