import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

import Fire from '../../Fire';

export const authenticate = (userId, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const singup = (email, password) => {
  return async (dispatch) => {
    Fire.shared.createUser({ email, password });

    var user = firebase.auth().currentUser;
    var localId, idToken;

    if (user) {
      localId = user.uid;
      idToken = user.getIdToken();
    }

    dispatch(authenticate(localId, idToken));
    saveDataToStorage(idToken, localId);
  };
};

export const login = (email, password) => {
  console.log('Handling login');
  return async (dispatch) => {
    error = await Fire.shared.login(email, password);

    if (error) {
      throw new Error(error);
    }

    var user = firebase.auth().currentUser;
    var localId, idToken;

    if (user) {
      localId = user.uid;
      idToken = user.getIdToken();
    }

    dispatch(authenticate(localId, idToken));
    saveDataToStorage(idToken, localId);
  };
};

export const logout = () => {
  Fire.shared.signOut();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId) => {
  var seen = [];

  AsyncStorage.setItem(
    'userData',
    JSON.stringify(
      {
        token: token,
        userId,
      },
      (key, val) => {
        if (val != null && typeof val == 'object') {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      }
    )
  );
};
