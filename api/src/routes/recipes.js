const { Router } = require("express");
const axios = require("axios");
const { getAllRecipes, getRecipeById, postNewRecipe } = require("./utils");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    let allRecipes = await getAllRecipes();

    if (name) {
      let recipeByName = await allRecipes.filter((e) =>
        e.name.toLowerCase().includes(name.toString().toLowerCase())
      );

      if (recipeByName.length) {
        let recipes = recipeByName.map((e) => {
          return {
            id: e.id,
            name: e.name,
            summary: e.summary,
            diets: e.diets,
            healthScore: e.healthScore,
            image: e.image,
            steps: e.steps,
          };
        });
        return res.status(200).send(recipes);
      }
      return res.status(404).send("Sorry, recipe not found");
    } else {
      let recipes = allRecipes.map((e) => {
        return {
          id: e.id,
          name: e.name,
          summary: e.summary,
          diets: e.diets,
          healthScore: e.healthScore,
          image: e.image,
          steps: e.steps,
        };
      });
      return res.status(200).send(recipes);
    }
  } catch {
    return res.status(400).send("invalid input");
  }
});

//-----------------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const infoApi = await getRecipeById(id);
    res.status(200).send(infoApi);
  } catch (error) {
    res.status(404).json("Error en ruta getId Recipe", error);
  }
});

//------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
  const objRecipe = req.body;
  try {
    const postRecipe = await postNewRecipe(objRecipe);
    res.status(201).json(postRecipe);
  } catch (error) {
    res.status(404).json("Error en ruta post Recipe", error);
  }
});

module.exports = router;
