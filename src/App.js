import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/Admin/AdminPage";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";

export const AuthContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <PrivateRoute path="/admin">
              <AdminPage/>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
