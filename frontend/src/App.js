
import Home from "./Pages/First/Home"
import Profile from "./Pages/Second/Profile"
import Login from "./Pages/login/Login"
import Register from "./Pages/register/Register"
import React, { useContext, useEffect  } from "react";
import { BrowserRouter as Router,Route ,Routes ,Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";



function App() {
  const {user} =useContext(AuthContext);
  /*useEffect(() => {
    // Add an event listener for the 'beforeunload' event
    const clearLocalStorage = () => {
      localStorage.removeItem("user"); // Replace "user" with your localStorage key
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);*/

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
