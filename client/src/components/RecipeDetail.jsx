import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanDetail } from "../actions";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./styles/RecipeDetail.module.css"

export default function RecipeDetail(props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const recipeDetail = useSelector(state => state.recipeDetail)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(getRecipeDetail(id))
    return () => dispatch(cleanDetail())
  }, [dispatch, id])

  return (
    <div id={styles.recipeDetail}>
      {
        loading && !recipeDetail?.length > 0 ? (
          <div id={styles.loading}>
            <span id={styles.dot}></span>
            <span id={styles.dot}></span>
            <span id={styles.dot}></span>
          </div>
        ) :
          <div id={styles.detailCard}>
            <img src={recipeDetail?.image} alt="Recipe Detail" />
            <h4><div id={styles.spanh4}>Name </div>{recipeDetail?.name}</h4>
            <h4><div id={styles.spanh4}>Summary </div>{recipeDetail?.summary?.replace(/<[^>]*>?/g, "")}</h4>
            <h4><div id={styles.spanh4}>HealthScore </div>{recipeDetail?.healthScore}</h4>
            {
              recipeDetail?.created
                ? <h4><div id={styles.spanh4}>Steps </div>{recipeDetail?.steps?.map(e => {
                  return <p>{e.step}</p>
                })}</h4>
                : <h4><div id={styles.spanh4}>Steps </div>{recipeDetail?.steps?.map(e => {
                  return <p>Step {e.number}: {e.step}</p>
                })}</h4>
            }
            <h4 id={styles.title}><div id={styles.spanh4}>Diets </div>{recipeDetail?.diets?.map((d, i) => {
              return <span id={styles.span} key={i}>{d}</span>
            })}</h4>
          </div>
      }
      <button id={styles.button} onClick={() => { history.goBack() }}>Back</button>
    </div>
  )
}