import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRecipes, getDietsTypes, filterDietType, orderAlphabetical, orderByHealthScore, cleanRecipes, setPage } from "../../actions/index";
import Recipe from "../Recipe/Recipe"
import Paginado from "../Paginado/Paginado";
import styles from "../Home/Home.module.css"
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";


export default function Home() {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes)
  // const [orden, setOrden] = useState("");

  //PAGINADO------------------------------------------------------------------

  const currentPage = useSelector(state => state.currentPage)
  const recipesPerPage = useSelector(state => state.recipesPerPage)

  const indexOfLastRecipe = currentPage * recipesPerPage //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0

  const actualRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)

  useEffect(() => {
    if (actualRecipes?.length === 0) {
      dispatch(getRecipes())
      dispatch(getDietsTypes())
    }
  }, [dispatch, actualRecipes])


  const handleClick = (e) => {
    e.preventDefault()
    dispatch(cleanRecipes())
    dispatch(setPage(1))
  }

  const handleFilterDietType = (e) => {
    e.preventDefault()
    dispatch(filterDietType(e.target.value))
  }

  const handleOrderAlphabetical = (e) => {
    e.preventDefault()
    dispatch(orderAlphabetical(e.target.value))
    // setOrden(`Ordenado ${e.target.value}`)
  }

  const handleHealthScore = (e) => {
    e.preventDefault()
    dispatch(orderByHealthScore(e.target.value))
    // setOrden(`Ordenado ${e.target.value}`)
  }


  return (
    <div id={styles.Home}>
      <NavBar ></NavBar>
      <div>
        <div id={styles.div_Select}>
          <select id={styles.select_Home} name="alphabetical" onChange={(e) => handleOrderAlphabetical(e)} defaultValue="default">
            <option value="default" disabled>Alphabetical Order...</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>
          <select id={styles.select_Home} name="numerical" onChange={(e) => handleHealthScore(e)} defaultValue="default">
            <option value="default" disabled>Health Score Order...</option>
            <option value="asc">From Min to Max</option>
            <option value="desc">From Max to Min</option>
          </select>
          <select id={styles.select_Home} name="diets" onChange={(e) => handleFilterDietType(e)} defaultValue="default">
            <option value="default" disabled>Select Diet...</option>
            <option value="gluten free">Gluten Free</option>
            <option value="dairy free">Dairy Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="fodmap friendly">Foodmap friendly</option>
            <option value="whole 30">Whole30</option>
          </select>
          <button id={styles.buttonClear} onClick={handleClick}>Refresh</button>
        </div>

        <Paginado />

        <div>
          <div id={styles.divCard}>
            {actualRecipes?.length < 1 ? <Loading /> : actualRecipes?.length > 0 ?
              actualRecipes?.map(recipe =>
                <Recipe id={recipe.id} image={recipe.image} name={recipe.name} healthScore={recipe.healthScore} diets={recipe.diets} created={recipe.created} key={recipe.id} />)
              : <NotFound />}
          </div>
        </div>

      </div>
    </div>
  )
}