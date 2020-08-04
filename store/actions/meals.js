import * as FileSystem from 'expo-file-system';
import Meal from '../../models/meal';
import Fire from '../../Fire';
import { Alert } from 'react-native';
import { storage } from 'firebase';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_MEAL = 'ADD_MEAL';
export const SET_MEALS = 'SET_MEALS';
export const SET_FAVORITE_MEALS = 'SET_FAVORITE_MEALS';
export const DELETE_MEAL = 'DELETE_MEAL';

export const toggleFavorite = (id) => {
  return async (dispatch) => {
    await Fire.shared.firestore
      .collection('users')
      .doc(Fire.shared.uid)
      .collection('recipes')
      .where('id', '==', id)
      .limit(1)
      .get()
      .then(async (query) => {
        let meal = query.docs[0];
        const isFav = meal.data().isFavorite;
        console.log('Currently isFavorite = ', isFav);
        meal.ref.update({ isFavorite: !isFav });
        dispatch({
          type: TOGGLE_FAVORITE,
          mealId: id,
        });
      })
      .catch((error) =>
        Alert.alert('Failed to toggle favorite: ', error.message)
      );

    // await Fire.shared.firestore
    // .collection('users')
    // .doc(Fire.shared.uid)
    // .collection('recipes')
    // .doc()
    // .then((snapshot) => {
    //   meals = snapshot.docs.map((doc) => doc.data());
    //   index = meals.findIndex((meal) => meal.id === id)
    // })
    // .catch((error) => Alert.alert('Failed to fetch meals: ', error.message));
  };
};

// export const editMeal = (mealToEdit, imagesChanged, props) => {
//   return async (dispatch) => {
//     mealId = mealToEdit.id

//     if (imagesChanged) {
//       // Handle Images
//       await Fire.shared.firestore
//       .collection('users')
//       .doc(Fire.shared.uid)
//       .collection('recipes')
//       .where('id', '==', mealId)
//       .limit(1)
//       .get()
//       .then(async (query) => {
//         let meal = query.docs[0];
//         const images = meal.data().images
//         for (const image in images) {
//           storage.
//         }
//     }

//     await Fire.shared.firestore
//       .collection('users')
//       .doc(Fire.shared.uid)
//       .collection('recipes')
//       .where('id', '==', mealId)
//       .limit(1)
//       .get()
//       .then(async (query) => {
//         let meal = query.docs[0];
//         meal.ref.update({
//           title: mealToEdit.title,
//           steps: mealToEdit.steps,
//           ingredients: mealToEdit.ingredients,
//           duration: mealToEdit.duration
//         });
//         dispatch({
//           type: TOGGLE_FAVORITE,
//           mealId: id,
//         });
//       })
//       .catch((error) =>
//         Alert.alert('Failed to toggle favorite: ', error.message)
//       );
//   };
// };

export const addMeal = (meal, props) => {
  return async (dispatch) => {
    const uuidv4 = () => {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      );
    };

    meal.id = uuidv4();
    Fire.shared
      .addRecipe(meal)
      .then((ref) => {
        console.log(ref);
        dispatch({
          type: ADD_MEAL,
          meal: meal,
        });
        props.navigation.goBack();
      })
      .catch((error) => Alert.alert('Failed to add recipe: ', error.message));
  };
};

export const deleteMeal = (mealId, props) => {
  return async (dispatch) => {
    Fire.shared
      .removeRecipe(mealId)
      .then((ref) => {
        dispatch({
          type: DELETE_MEAL,
          id: mealId,
        });
        props.navigation.goBack(null);
      })
      .catch((error) =>
        Alert.alert('Failed to remove recipe: ', error.message)
      );
  };
};

export const fetchMeals = () => {
  return async (dispatch) => {
    let meals = [];
    console.log('uid = ', Fire.shared.uid);
    await Fire.shared.firestore
      .collection('users')
      .doc(Fire.shared.uid)
      .collection('recipes')
      .get()
      .then((snapshot) => {
        meals = snapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => Alert.alert('Failed to fetch meals: ', error.message));

    const loadedMeals = [];
    for (let meal in meals) {
      meal = meals[meal];
      loadedMeals.push(
        new Meal(
          meal.id,
          meal.categoryId,
          meal.title,
          meal.images,
          meal.duration,
          meal.ingredients,
          meal.steps,
          meal.isFavorite
        )
      );
    }

    dispatch({
      type: SET_MEALS,
      meals: loadedMeals,
    });
  };
};
