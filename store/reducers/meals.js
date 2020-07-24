import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, ADD_MEAL } from '../actions/meals';
import Meal from '../../models/meal';
// import crypto from 'crypto';

const initialState = {
  meals: MEALS,
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

    case ADD_MEAL:
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
        categoryId,
        title,
        imgUrl,
        duration,
        ingredients,
        steps,
      } = action.meal;
      const id = uuidv4();
      const newMeal = new Meal(
        id,
        categoryId,
        title,
        imgUrl,
        duration,
        ingredients,
        steps
      );
      console.log(newMeal);
      return {
        ...state,
        meals: state.meals.concat(newMeal),
      };
    default:
      return state;
  }
};

export default mealsReducer;
