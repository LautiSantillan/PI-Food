import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanDetail } from "../actions";
import { useEffect } from "react";
import styles from "./styles/RecipeDetail.module.css"

export default function RecipeDetail(props) {
  const recipeId = props.match.params.id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecipeDetail(recipeId))
    return () => { dispatch(cleanDetail()) }
  }, [dispatch, recipeId])

  const recipeDetail = useSelector(state => state.recipeDetail)

  return (
    <div id={styles.recipeDetail}>
      {
        recipeDetail.length < 1 ? (
          <div id={styles.loading}>
            <span id={styles.dot}></span>
            <span id={styles.dot}></span>
            <span id={styles.dot}></span>
          </div>
        ) :
          <div id={styles.detailCard}>
            <img src={recipeDetail.image} alt="Recipe Detail" />
            <h3><span id={styles.spanh4}>Name: </span>{recipeDetail.name}</h3>
            <h4><span id={styles.spanh4}>Summary: </span>{recipeDetail.summary?.replace(/<[^>]*>?/g, "")}</h4>
            <h4><span id={styles.spanh4}>HealthScore: </span>{recipeDetail.healthScore}</h4>
            <h4><span id={styles.spanh4}>Steps: </span>{recipeDetail.steps?.map(e => {
              return <p>Step {e.number}: {e.step}</p>

            })}</h4>
            <h4 id={styles.title}><span id={styles.spanh4}>Diets: </span>{recipeDetail.diets?.map((d, i) => {
              return <span id={styles.span} key={i}>{d}</span>
            })}</h4>
          </div>
      }
      <Link to={"/home"}>
        <button id={styles.button}>Back</button>
      </Link>
    </div>
  )
}