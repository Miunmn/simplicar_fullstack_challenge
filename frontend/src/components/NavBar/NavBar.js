import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { setEmail } from "../../redux/slices/account";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
// import { useHistory } from "react-router-dom";
import axios from "axios";
const NavBar = ({fetchTasks}) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const handleLogOut = () => {
    dispatch(setEmail(null));
  };
  // const history = useHistory();
  const handleSaveTask = async (name, description) => {
    try {
      await axios.post("/create-task", { name, description });
      toggleShow();
      await fetchTasks();
      console.log("aaaa")
      // history.push("/")
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  const handleAddTask = () => {
    toggleShow();
  };

  const [createTaskModal, setCreateTaskModal] = useState(false);
  const toggleShow = () => {
    setCreateTaskModal(!createTaskModal)
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ background: "#e90c54", color: "#ffffff" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kanban
          </Typography>
          {email && (
            <>
              <Typography className="mr-3">
                <MDBBtn onClick={handleAddTask}>Add task</MDBBtn>
              </Typography>
              <Typography>
                <MDBBtn onClick={handleLogOut}>Log Out</MDBBtn>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <CreateTaskModal
        toggleShow={toggleShow}
        createTaskModal={createTaskModal}
        setCreateTaskModal={setCreateTaskModal}
        handleSaveTask={handleSaveTask}
      />
    </>
  );
};

export default NavBar;
