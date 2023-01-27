import React from "react";
import { useState } from "react";
import axios from "axios";
import validators from "../../utils/validators";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value) => {
    // validators.validateEmail()
  };

  const handleSignUp = async () => {
    try{
      const response = await axios.post("/create-user", {first_name: name, email, password})
      console.log(response)
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <MDBContainer fluid className="bg-dark">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard className="my-4">
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="rounded-start"
                  fluid
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">Sign Up!</h3>

                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First Name"
                        size="lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="form1"
                        type="text"
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        size="lg"
                        id="form2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                    id="form3"
                    
                    type="password"
                  />
                  <MDBBtn onClick={handleSignUp} className="mb-4">Sign in</MDBBtn>
                  <p>
                    <a href="/">Already have an account</a>
                  </p>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;
