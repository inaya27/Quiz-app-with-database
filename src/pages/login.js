import { useState } from "react";
import { LoginMethod } from "../config/firebasemethods";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";

export default function Login() {
  const [loginState, setLoginState] = useState({});
  const navigate = useNavigate();

  function handleSubmitLogin(e) {
    e.preventDefault();
    LoginMethod(loginState)
      .then((res) => navigate("/student"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-body background">
      <div className="content-login shadow">
        <section className="section-1">
          <h1 className="display-4">Login</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "93%", marginTop: "25px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="secondary"
              type={EmailOutlined}
              value={loginState.email ? loginState.email : ""}
              onChange={(e) =>
                setLoginState({ ...loginState, email: e.target.value })
              }
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              type="password"
              value={loginState.password ? loginState.password : ""}
              onChange={(e) =>
                setLoginState({ ...loginState, password: e.target.value })
              }
            />
          </Box>

          <Box
            sx={{
              width: "95%",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleSubmitLogin}
            >
              Login
            </Button>
          </Box>
        </section>
        <section className="section-2">
          <img
            src="https://img.freepik.com/free-vector/online-certification-with-books_23-2148571442.jpg?w=826&t=st=1696268547~exp=1696269147~hmac=6d8a5a0cdb9e9a2a352dc55f40e1f917328f46cdeaf0fde23deec60eac0c9cfa"
            alt="signup"
            width="100%"
            height="100%"
          />
        </section>
      </div>
    </div>
  );
}
