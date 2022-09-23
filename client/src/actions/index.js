import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const FILTER_DIET_TYPE = "FILTER_DIET_TYPE";
export const ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const allRecipes = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: GET_RECIPES,
        payload: allRecipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipeByName(name) {
  return async function (dispatch) {
    try {
      const recipeName = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: recipeName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterDietType(payload) {
  return {
    type: FILTER_DIET_TYPE,
    payload,
  };
}

export function orderAlphabetical(payload) {
  return {
    type: ORDER_ALPHABETICAL,
    payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: ORDER_BY_HEALTHSCORE,
    payload,
  };
}
