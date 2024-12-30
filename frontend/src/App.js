
import Home from "./Pages/First/Home"
import Profile from "./Pages/Second/Profile"
import Login from "./Pages/login/Login"
import Register from "./Pages/register/Register"
import React, { useContext} from "react";
import { BrowserRouter as Router,Route ,Routes ,Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";



function App() {
  const {user} =useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={<Profile />}
        />
      </Routes>
    </Router>

    

  )
}

export default App;
