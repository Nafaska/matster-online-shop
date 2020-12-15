import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux"
import Header from "./components/Header"
import BasketPage from "./pages/BasketPage";
import LogsPage from "./pages/LogsPage";
import store from "./store";

function App() {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Header />
            <div className="App-container">
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route exact path="/basket">
                    <BasketPage />
                  </Route>
                  <Route exact path="/logs">
                    <LogsPage />
                  </Route>
                </Switch>
            </div>
          </div>
        </Router>
    </Provider>
  );
}

export default App;
