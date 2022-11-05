const axios = require("axios");

const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

//-----------------------FUNCIONES DE BASE DE DATOS----------------------------------------------

const getInfoRecipe = async () => {
  try {
    // const infoApi = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    // );
    const infoApi = await axios.get(
      `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );
    const data = infoApi.data.results;
    const infoRecipe = data?.map((recipe) => {
      // let aux = "";
      // recipe.analyzedInstructions[0]?.steps.forEach((e) => {
      //   aux += `Step ${e.number}: ${e.step} `;
      // });
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
        image: recipe.image,
        // steps: aux,
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
    console.log("Error in getInfoRecipe", error);
  }
};

const getInfoRecipeDB = async () => {
  try {
    const dbInfo = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    var dato = JSON.parse(JSON.stringify(dbInfo, null, 2));
    dato.forEach((el) => (el.diets = el.diets.map((el) => el.name)));

    return dato;
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipes = async () => {
  try {
    const infoApi = await getInfoRecipe();
    const dataDB = await getInfoRecipeDB();
    const allRecipes = [...infoApi, ...dataDB];
    return allRecipes;
  } catch (error) {
    console.error(error);
  }
};

//-----------------------FUNCIONES PARA RUTAS DE RECETAS----------------------------------------------

const postNewRecipe = async (objRecipe) => {
  try {
    const { name, summary, healthScore, steps, image, diets } = objRecipe;
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
      image,
    };

    const dietsTypes = await Diet.findAll({
      where: { name: diets },
    });

    const newRecipe = await Recipe.create(recipe);

    newRecipe.addDiet(dietsTypes);
  } catch (error) {
    console.log("Error in postNewRecipe", error);
  }
};

const deleteRecipe = async (id) => {
  try {
    const deletedRecipe = await Recipe.findByPk(id);
    await Recipe.destroy({
      where: { id: id },
    });
    return deletedRecipe;
  } catch (error) {
    console.log("Error in deleteRecipe", error);
  }
};

const updateRecipe = async (id, datos) => {
  try {
    await Recipe.update(datos, {
      where: { id: id },
    });
  } catch (error) {
    console.log("Error in updateRecipe", error);
  }
};

//-----------------------FUNCIONES PARA RUTA DE DIETAS----------------------------------------------

const createDietsDB = async () => {
  try {
    const dietTypes = [
      "gluten free",
      "ketogenic",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
      "dairy free",
    ];
    dietTypes.forEach((e) => {
      Diet.findOrCreate({
        where: { name: e },
      });
    });
  } catch (error) {
    console.log("Error in createDietsDB", error);
  }
};

const getInfoDietsDB = async () => {
  try {
    const diets = await Diet.findAll();
    return diets;
  } catch (error) {
    console.error("Error in getInfoDietsDB", error);
  }
};

module.exports = {
  getInfoRecipe,
  getAllRecipes,
  postNewRecipe,
  createDietsDB,
  getInfoDietsDB,
  deleteRecipe,
  updateRecipe,
};
