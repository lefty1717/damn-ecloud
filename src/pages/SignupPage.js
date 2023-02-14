import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { collection, addDoc ,doc,setDoc} from "firebase/firestore"; 
import { db } from "../firebase";

const SignupPage = (props) => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  console.log(account);

  const handleSubmit = async function () {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );

      if (res) {
        await updateProfile(auth.currentUser, {
          displayName: account.displayName,
        });
      }

      await setDoc(doc(db, "users",`${auth.currentUser.uid}`), {
        name:account.displayName,
        auth:"normal",
      });

      await addDoc(collection(db,`users/${auth.currentUser.uid}`,"fridge"),{

      });

      await addDoc(collection(db,`users/${auth.currentUser.uid}`,"shoppingList"),{

      });

      setMessage("");
      console.log(auth.currentUser.uid)
      console.log("註冊成功")
    } catch (error) {
      setMessage("" + error);
    }
  };

  return (
    <div className="login-signup-Page">
      <Grid className="box">
        <Card className="inputTextbox">
          <div>
            <input
              name="displayName"
              onChange={handleChange}
              value={account.displayName}
              type="text"
              placeholder="姓名"
            ></input>
            <br />
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
              placeholder="密碼"
            ></input>
            <br />
            <br />
            {message}
            <br />
            {/* <input  type="password" placeholder="確認密碼"></input> */}
          </div>
        </Card>

        <Card className="login-sugnup-Button">
          <div align="center">
            <Button fullWidth onClick={handleSubmit}>
              註冊
            </Button>
            <Button href="/">馬上登入</Button>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default SignupPage;
