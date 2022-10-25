import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS_TYPES = "GET_DIETS_TYPES";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_DIET_TYPE = "FILTER_DIET_TYPE";
export const ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const LOADING = "LOADING";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export function loading() {
  return {
    type: LOADING,
  };
}

export function getRecipes() {
  return async function (dispatch) {
    dispatch(loading());
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

//--------------RECIPE DATABASE-----------------------------

export function updateRecipe(id, payload) {
  return async function (dispatch) {
    try {
      const recipeId = await axios.put(
        `http://localhost:3001/recipes/${id}`,
        payload
      );
      return dispatch({
        type: UPDATE_RECIPE,
        payload: recipeId.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteRecipe(id) {
  return async function (dispatch) {
    try {
      const recipeId = await axios.delete(
        `http://localhost:3001/recipes/${id}`
      );
      return dispatch({
        type: DELETE_RECIPE,
        payload: recipeId.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//--------------SEARCH BAR-----------------------------
export function getRecipeByName(name) {
  return async function (dispatch) {
    dispatch(loading());
    try {
      const recipeName = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: recipeName.data,
      });
    } catch (error) {}
    return dispatch({
      type: GET_RECIPE_BY_NAME,
      payload: [],
    });
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    dispatch(loading());
    try {
      const recipeDetail = await axios.get(
        `http://localhost:3001/recipes/${id}`
      );
      return dispatch({
        type: GET_RECIPE_DETAIL,
        payload: recipeDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//----------------FORMULARIO-------------------------------------------
export function getDietsTypes() {
  return async function (dispatch) {
    try {
      const dietsTypes = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: GET_DIETS_TYPES,
        payload: dietsTypes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipe(payload) {
  return async function () {
    try {
      const newRecipe = await axios.post(
        "http://localhost:3001/recipes",
        payload
      );
      return newRecipe;
    } catch (error) {
      console.log(error);
    }
  };
}

//-----------------------------FILTRADO----------------------------------------

export function filterDietType(payload) {
  return {
    type: FILTER_DIET_TYPE,
    payload,
  };
}

//---------------------------ORDENAMIENTO----------------------------------------

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

export function cleanDetail() {
  return {
    type: CLEAR_DETAIL,
    payload: [],
  };
}

export function setCurrentPage(payload) {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
}
