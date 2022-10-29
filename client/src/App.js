import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Home from "./components/home";
import CreateRecipe from "./components/createrecipe";
import RecipeDetail from "./components/recipedetail";
import UpdateRecipe from "./components/updaterecipe";

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
