import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar.js";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home.js";
import Box from "@mui/material/Box";
import { UserContext } from "./utils/UserContext";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";
import axios from "axios";
function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState({});

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/get-tasks");
      setTasks(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    fetchTasks()
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Router>
        <Box sx={{ flexGrow: 1 }}>
          <NavBar fetchTasks={fetchTasks}/>
        </Box>
          <Switch>
            <Route exact path="/sign-up" component={() => <SignUp />}></Route>
            <Route exact path="/login" component={() => <Login />}></Route>
            <PrivateRoute exact path="/" component={() => <Home fetchTasks={fetchTasks} tasks={tasks} />} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
