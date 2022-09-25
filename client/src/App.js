import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/home"} component={Home} />
        <Route path={"/recipes"} component={CreateRecipe} />
        <Route path={"/home/:id"} component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
