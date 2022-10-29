import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingpage.jsx";
import Home from "./components/home.jsx";
import CreateRecipe from "./components/createrecipe.jsx";
import RecipeDetail from "./components/recipedetail.jsx";
import UpdateRecipe from "./components/updaterecipe.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/recipes"} component={CreateRecipe} />
        <Route exact path={"/home/:id"} component={RecipeDetail} />
        <Route exact path={"/updaterecipe/:id"} component={UpdateRecipe} />
      </Switch>
    </div>
  );
}

export default App;
