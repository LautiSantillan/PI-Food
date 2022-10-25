import {
  GET_RECIPES,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_DETAIL,
  GET_DIETS_TYPES,
  POST_RECIPE,
  FILTER_DIET_TYPE,
  ORDER_ALPHABETICAL,
  ORDER_BY_HEALTHSCORE,
  CLEAR_DETAIL,
  LOADING,
  SET_CURRENT_PAGE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} from "../actions/index";

const initialState = {
  recipes: [],
  allRecipes: [], //es una propiedad de respaldo
  diets: [],
  recipeDetail: [],
  loading: true,
  currentPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        loading: false,
        recipeDetail: action.payload,
      };

    case GET_DIETS_TYPES:
      return {
        ...state,
        diets: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };

    case UPDATE_RECIPE:
      return {
        ...state,
      };

    case DELETE_RECIPE:
      const allRecipes3 = state.allRecipes;
      const deletedRecipe = allRecipes3.filter(
        (recipe) => recipe.id !== action.payload
      );
      return {
        ...state,
        recipes: deletedRecipe,
      };

    case FILTER_DIET_TYPE:
      const allRecipes = state.allRecipes;
      const dietsFiltered = allRecipes.filter((recipe) =>
        recipe.diets?.includes(action.payload)
      );
      return {
        ...state,
        recipes: dietsFiltered,
      };

    case ORDER_ALPHABETICAL: {
      const allRecipes = [...state.recipes];
      const orderAlphabetical =
        action.payload === "atoz"
          ? allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: orderAlphabetical,
      };
    }

    case ORDER_BY_HEALTHSCORE:
      const allRecipes2 = [...state.recipes];
      const orderHealthScore =
        action.payload === "asc"
          ? allRecipes2.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (b.healthScore > a.healthScore) return -1;
              return 0;
            })
          : allRecipes2.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return -1;
              if (b.healthScore > a.healthScore) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: orderHealthScore,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };

    case LOADING:
      return {
        loading: true,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
