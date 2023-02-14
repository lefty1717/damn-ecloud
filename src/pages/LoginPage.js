import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import googleIcon from "../../src/images/googleIcon.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';


const LoginPage = () => {
    
  const [account, setAccount] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const navigate = useNavigate();
  const goToForgotpasswordPage = () => {
    navigate("recipe/forgotpassword");
  }

  const [message, setMessage] = useState("");

  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const[state,dispatch]=useStateValue();

  const handleSubmit = async function () {

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );

      if (res) {
        dispatch({
          type:actionTypes.SET_USER,
          user:auth.currentUser,
      })
        console.log(auth.currentUser.displayName);
      }

      localStorage.setItem("userUid",auth.currentUser.uid);

      setMessage("");
    } catch (error) {
      setMessage("" + error);
    }
  };


  return (
    <div className="login-signup-Page">
      <Grid className="box">
        <Card className="inputTextbox">
          <input
            name="email"
            onChange={handleChange}
            value={account.email}
            type="email"
            placeholder="Email"
          ></input>
          <br />
          <input
            name="password"
            onChange={handleChange}
            value={account.password}
            type="password"
            placeholder="Password"
          ></input>
          <br />
          {message}
          <br />
        </Card>

        <Card className="login-sugnup-Button">
          <Button fullWidth onClick={handleSubmit}>
            登入
          </Button>
        </Card>

        <Card className="otherLoginOptions">
          <div align="center">
            {/* <Button>
              <Avatar src={googleIcon}></Avatar>
            </Button> */}
            <Button href="/forgotpassword">
              忘記密碼
            </Button>
            <Button href="signup">
              註冊一個
            </Button>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default LoginPage;

