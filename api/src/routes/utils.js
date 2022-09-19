const axios = require("axios");

const { Recipe, Diet } = require("../db");

//-----------------------FUNCIONES DE BASE DE DATOS----------------------------------------------

const getInfoRecipe = async () => {
  try {
    const infoApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=913ca4904af6441b8f082e172df13bdd&number=10&addRecipeInformation=true`
    );
    const data = infoApi.data.results;
    const infoRecipe = data?.map((recipe) => {
      let aux = "";
      recipe.analyzedInstructions[0]?.steps.forEach((e) => {
        aux += `Step ${e.number}: ${e.step}`;
      });
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
        image: recipe.image,
        steps: aux,
      };
    });
    infoRecipe.forEach(async (e) => {
      await postNewRecipe(e);
    });
  } catch (error) {
    console.log("Error en getInfoRecipe", error);
  }
};

const getInfoRecipeDB = async () => {
  try {
    const dataDB = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dataDB;
  } catch (error) {
    console.error(error);
  }
};

const getAllRecipes = async () => {
  try {
    const dataDB = await getInfoRecipeDB();
    const allRecipes = [...dataDB];
    return allRecipes;
  } catch (error) {
    console.error(error);
  }
};

//-----------------------FUNCIONES PARA RUTAS DE RECETAS----------------------------------------------

const getRecipeById = async (id) => {
  try {
    const infoApi = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=913ca4904af6441b8f082e172df13bdd`
    );
    const data = [];
    data.push(infoApi.data);
    const infoRecipe = data?.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
        image: recipe.image,
        steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
      };
    });
    return infoRecipe;
  } catch (error) {
    console.log("Error en getRecipeById", error);
  }
};

const postNewRecipe = async (objRecipe) => {
  try {
    const { name, summary, healthScore, steps, diets } = objRecipe;
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
    };

    const dietsTypes = await Diet.findAll({
      where: { name: diets },
    });

    const newRecipe = await Recipe.create(recipe);

    newRecipe.addDiet(dietsTypes);
  } catch (error) {
    console.log("Error en postNewRecipe", error);
  }
};

//-----------------------FUNCIONES PARA RUTA DE DIETAS----------------------------------------------

const createDietsDB = async () => {
  try {
    const dietTypes = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "ovo vegetarian",
      "lacto ovo vegetarian",
      "vegan",
      "pescetarian",
      "paleolithic",
      "primal",
      "low fodmap",
      "whole 30",
      "dairy free",
    ];
    dietTypes.forEach((e) => {
      Diet.findOrCreate({
        where: { name: e },
      });
    });
    const diets = await Diet.findAll();
    return diets;
  } catch (error) {
    console.log("Error en createDietsDB", error);
  }
};

const getInfoDietsDB = async () => {
  try {
    const dataDB = await Diet.findAll({
      include: {
        model: Recipe,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dataDB;
  } catch (error) {
    console.error("Error en getInfoDietsDB", error);
  }
};

module.exports = {
  getInfoRecipe,
  getAllRecipes,
  getRecipeById,
  postNewRecipe,
  createDietsDB,
  getInfoDietsDB,
};
