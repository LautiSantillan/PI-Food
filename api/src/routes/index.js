const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
const recipes = require("./recipes.js");
const diets = require("./diets");

const router = Router();

// Configurar los routers
router.use("/recipes", recipes);
router.use("/diets", diets);

module.exports = router;
