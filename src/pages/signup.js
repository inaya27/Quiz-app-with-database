import { useState } from "react";
import { SignUpMethod } from "../config/firebasemethods";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { EmailOutlined, Password } from "@mui/icons-material";

export default function SignUp() {
  const [signUpState, setSignUpState] = useState({});
  const navigate = useNavigate();

  function handleSubmitSignUp(e) {
    e.preventDefault();
    signUpState.role = "admin";
    SignUpMethod(signUpState)
      .then((res) => {
        if (signUpState.role === "admin") {
          navigate(`/admin`);
        } else {
          navigate(`/student`);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-body background">
      <div className="content shadow">
        <section className="section-1">
          <h1 className="display-4">Sign Up</h1>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "45%", marginTop: "25px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              color="secondary"
              value={signUpState.username ? signUpState.username : ""}
              onChange={(e) =>
                setSignUpState({ ...signUpState, username: e.target.value })
              }
            />

            <TextField
              id="outlined-basic"
              label="FullName"
              variant="outlined"
              color="secondary"
              value={signUpState.fullname ? signUpState.fullname : ""}
              onChange={(e) =>
                setSignUpState({ ...signUpState, fullname: e.target.value })
              }
            />
          </Box>

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
              value={signUpState.email ? signUpState.email : ""}
              onChange={(e) =>
                setSignUpState({ ...signUpState, email: e.target.value })
              }
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              color="secondary"
              type="password"
              value={signUpState.password ? signUpState.password : ""}
              onChange={(e) =>
                setSignUpState({ ...signUpState, password: e.target.value })
              }
            />
          </Box>

          <Box
            sx={{
              width: "95%",
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleSubmitSignUp}
            >
              SignUp
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
