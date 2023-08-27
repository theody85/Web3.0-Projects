import "./App.css";
import { AlchemyContextProvider } from "./components";
import { Home, Blocks } from "./pages";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <AlchemyContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blocks">
            <Blocks />
          </Route>
        </Switch>
      </BrowserRouter>
    </AlchemyContextProvider>
  );
};

export default App;
