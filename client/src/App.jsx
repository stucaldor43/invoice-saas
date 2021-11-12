import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "./hooks/useProvideAuth.jsx";
import Home from "./pages/home/index.jsx";
import SiginPage from "./pages/signin/index.jsx";
import ClientsPage from "./pages/clients/index.jsx";
import NewClientPage from "./pages/newClient/index.jsx";
import { SignUpPage } from "./pages/signup/index.jsx";
import { Navigation } from "./components/Navigation/index.jsx";
import styles from "./App.module.css";
import { InvoiceCreationPage } from "./pages/invoice-creation/index";

function App() {
  const [isNavOpen] = useState(true);
  const auth = useAuth();

  useEffect(function () {
    function storageChange(event) {
      console.log(event);
      if (event.key === "loggedIn") {
        if (event.newValue === "false") {
          auth.signOut();
        }
      }
    }

    window.addEventListener("storage", storageChange);
  }, []);

  return (
    <div className="App">
      <Router>
        <div className={styles.wrapper}>
          <Navigation isOpen={isNavOpen} />
          <div className={styles.pageContainer}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <div>My About Page</div>
              </Route>
              <Route path="/signin">
                <SiginPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/clients">
                <ClientsPage />
              </Route>
              <Route path="/client/new">
                <NewClientPage />
              </Route>
              <Route path="/invoice/new">
                <InvoiceCreationPage></InvoiceCreationPage>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
