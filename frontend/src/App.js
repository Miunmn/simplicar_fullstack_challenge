import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home.js";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
// import Home from "./components/Home.js";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login";


import Box from "@mui/material/Box";

import { UserContext } from "./utils/UserContext";
import PrivateRoute from "./utils/PrivateRoute";




function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <NavBar />
          {/* <AppBar
            position="static"
            style={{ background: "#e90c54", color: "#ffffff" }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Kanban
              </Typography>
              {
                email 
                &&
                <>
                  <Typography className="mr-3">
                    <MDBBtn  onClick={handleAddTask}>Add task</MDBBtn>
                  </Typography>
                  <Typography>
                    <MDBBtn onClick={handleLogOut}>Log Out</MDBBtn>
                  </Typography>
                </>
              }
            </Toolbar>
          </AppBar> */}
        </Box>
        <Router>
          <Switch>
            <Route exact path="/sign-up" component={() => <SignUp />}></Route>
            <Route exact path="/login" component={() => <Login />}></Route>
            <PrivateRoute exact path="/" component={() => <Home />} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
