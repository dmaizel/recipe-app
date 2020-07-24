import * as FileSystem from 'expo-file-system';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_MEAL = 'ADD_MEAL';

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export const addMeal = (meal) => {
  return {
    type: ADD_MEAL,
    meal: meal,
  };
};
