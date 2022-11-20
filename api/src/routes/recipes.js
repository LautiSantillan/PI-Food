const { Router } = require("express");
const {
  getAllRecipes,
  postNewRecipe,
  deleteRecipe,
  updateRecipe,
} = require("./utils");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let info = await getAllRecipes();

    if (name) {
      let recipeName = info.filter((r) =>
        r.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send("Recipe not found");
    } else {
      res.status(200).send(info);
    }
  } catch (error) {
    console.log("Error in route getQueryName", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const infoApi = await getAllRecipes();
    if (id) {
      const recipeById = infoApi.find((recipe) => recipe.id == id);
      recipeById
        ? res.status(200).json(recipeById)
        : res.status(404).json("Not found recipe detail");
    }
  } catch (error) {
    res.status(404).json("Error in route getId Recipe", error);
  }
});

router.post("/", async (req, res) => {
  const objRecipe = req.body;
  try {
    const postRecipe = await postNewRecipe(objRecipe);
    res.status(201).json(postRecipe);
  } catch (error) {
    res.status(404).json("Error in route post Recipe", error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const updatedRecipe = await updateRecipe(id, datos);
    console.log(updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(404).json("Error in route update Recipe", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await deleteRecipe(id);
    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(404).json("Error in route delete Recipe", error);
  }
});

module.exports = router;
