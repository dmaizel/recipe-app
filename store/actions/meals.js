import * as FileSystem from 'expo-file-system';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const ADD_MEAL = 'ADD_MEAL';

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};

export const addMeal = (meal) => {
  return {
    type: ADD_MEAL,
    meal: meal,
  };
};
