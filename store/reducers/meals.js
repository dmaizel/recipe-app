import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS, ADD_MEAL } from '../actions/meals';
import Meal from '../../models/meal';
// import crypto from 'crypto';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      // Go through each meal and check if its against one of the applied filters
      const updatedFilteredMeals = state.meals.filter((meal) => {
        for (var filter in appliedFilters) {
          if (meal[filter] === false && appliedFilters[filter] === true) {
            return false;
          }
        }
        return true;
      });

      return {
        ...state,
        filteredMeals: updatedFilteredMeals,
      };

    case ADD_MEAL:
      // const uuidv4 = () => {
      //   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      //     (
      //       c ^
      //       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      //     ).toString(16)
      //   );
      // };
      const uuidv4 = () => {
        var S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
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
      const {
        categoryIds,
        title,
        affordability,
        complexity,
        imgUrl,
        duration,
        ingredients,
        steps,
      } = action.meal;
      const id = uuidv4();
      const newMeal = new Meal(
        id,
        categoryIds,
        title,
        affordability,
        complexity,
        imgUrl,
        duration,
        ingredients,
        steps
      );
      return {
        ...state,
        meals: state.meals.concat(newMeal),
        filteredMeals: state.filteredMeals.concat(newMeal),
      };
    default:
      return state;
  }
};

export default mealsReducer;
