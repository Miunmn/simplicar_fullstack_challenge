import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/slices/account";


const Login = () => {
  const [email, setEmailVal] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { email, password });
      console.log("response", response);
      const data = response.data;
      if (data) dispatch(setEmail(email));
      history.push("/");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        value={email}
        onChange={(e) => setEmailVal(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <MDBBtn className="mb-4" onClick={handleLogin}>
        Login
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <a href="/sign-up">Register</a>
        </p>
      </div>
    </MDBContainer>
  );
};

export default Login;
