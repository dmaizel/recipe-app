import { MEALS } from '../../data/dummy-data';
import {
  TOGGLE_FAVORITE,
  ADD_MEAL,
  SET_MEALS,
  DELETE_MEAL,
} from '../actions/meals';
import Meal from '../../models/meal';

const initialState = {
  meals: MEALS,
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      let copy = [...state.meals];
      existingIndex = copy.findIndex((meal) => meal.id == action.mealId);

      //Update object's name property.
      copy[existingIndex].isFavorite = !copy[existingIndex].isFavorite;
      // const existingIndex = state.meals.findIndex(
      //   (meal) => meal.id === action.mealId
      // );
      // let meal = state.meals[existingIndex];
      // const updatedMeals = [...state.meals];
      // updatedMeals.splice(existingIndex, 1);
      // meal.isFavorite = !meal.isFavorite;
      return {
        ...state,
        meals: [...copy],
      };
    case SET_MEALS:
      return {
        ...state,
        meals: action.meals,
      };
    case ADD_MEAL:
      const {
        id,
        categoryId,
        title,
        imgUrl,
        duration,
        ingredients,
        steps,
      } = action.meal;
      const newMeal = new Meal(
        id,
        categoryId,
        title,
        imgUrl,
        duration,
        ingredients,
        steps
      );
      return {
        ...state,
        meals: state.meals.concat(newMeal),
      };
    case DELETE_MEAL:
      existingIndex = state.meals.findIndex((meal) => meal.id == action.mealId);
      const updatedMeals = [...state.meals];
      updatedMeals.splice(existingIndex, 1);
      return {
        ...state,
        meals: [...updatedMeals],
      };
    default:
      return state;
  }
};

export default mealsReducer;
