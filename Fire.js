import FirebaseKeys from './config';
import firebase from 'firebase';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
require('firebase/firestore');

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
    }
  }

  removeRecipe = async (id) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection(`users`)
        .doc(this.uid)
        .collection('recipes')
        .where('id', '==', id)
        .limit(1)
        .get()
        .then(async (query) => {
          let meal = query.docs[0];
          console.log('Currently being deleted = ', meal.data().title);
          meal.ref
            .delete()
            .then((ref) => res(ref))
            .catch((error) => rej(error));
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  addRecipe = async (meal) => {
    var imageCounter = 0;
    var images = [];
    for (const image in meal.imgUrl) {
      const remoteUri = await this.uploadPhotoAsync(
        meal.imgUrl[image],
        `photos/${this.uid}/${imageCounter++}/${Date.now()}`
      );
      images.push(remoteUri);
    }

    return new Promise((res, rej) => {
      this.firestore
        .collection(`users`)
        .doc(this.uid)
        .collection('recipes')
        .add({
          id: meal.id,
          categoryId: meal.categoryId,
          title: meal.title,
          images,
          duration: meal.duration,
          ingredients: meal.ingredients,
          steps: meal.steps,
          isFavorite: false,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri, filename) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log('error ', e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref(filename);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
    //     try {
    //       const response = await fetch(uri);
    //     } catch (err) {
    //       console.log(err);
    //     }

    //     const file = await response.blob();

    //     let upload = firebase.storage().ref(filename).put(file);

    //     upload.on(
    //       'state_changed',
    //       (snapshot) => {},
    //       (err) => {
    //         rej(err);
    //       },
    //       async () => {
    //         const url = await upload.snapshot.ref.getDownloadURL();
    //         res(url);
    //       }
    //     );
  };

  createUser = async (user) => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection('users').doc(this.uid);
      db.set({
        name: 'Place holder name',
        email: user.email,
        avatar: null,
      });

      //   if (user.avatar) {
      //     remoteUri = await this.uploadPhotoAsync(
      //       user.avatar,
      //       `avatars/${this.uid}`
      //     );
      //     db.set({ avatar: remoteUri }, { merge: true });
      //   }
    } catch (error) {
      Alert.alert('Error: ', error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        return error.message;
      });

    return null;
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
