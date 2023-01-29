import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBInput,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import { useState } from "react";
const CreateTaskModal = ({
  createTaskModal,
  setCreateTaskModal,
  toggleShow,
  handleSaveTask,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  return (
    <MDBModal show={createTaskModal} setShow={setCreateTaskModal} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Create Task</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="form1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Description"
              id="form2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn onClick={() => handleSaveTask(name, description)}>Save task</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default CreateTaskModal;
