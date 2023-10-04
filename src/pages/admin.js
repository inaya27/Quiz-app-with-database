import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fbAdd } from "../config/firebasemethods";

export default function Admin() {
  const [options, setOptions] = useState([]);
  const [optVal, setOptVal] = useState("");
  const [corrAns, setCorrAns] = useState("");
  const [question, setQuestion] = useState("");
  const [questionArr, setQuestionArr] = useState([]);
  const [lock, setLock] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const [quiz, setQuiz] = useState([]);

  const navigate = useNavigate();

  function handleAddOption() {
    setOptions([...options, optVal]);
  }

  function handleRender() {
    const questionObj = {
      question: question,
      options: options,
      correctAnswer: corrAns,
    };

    setQuestionArr([...questionArr, questionObj]);
    setQuestion("");
    setCorrAns("");
    setOptVal("");
    setOptions([]);
  }

  function handleLockQuiz() {
    setLock((lock) => !lock);
  }

  function handleSaveQuiz() {
    const quizObj = {
      quizInformation: quizInfo,
      quizQuestions: questionArr,
    };
    fbAdd("quiz", quizObj)
      .then((res) => console.log("data send successfully"))
      .catch((err) => console.log(err));

    setQuiz([...quiz, quizObj]);

    setQuestionArr([]);
    setQuizInfo({});
    setLock((lock) => false);
    // console.log(quiz);
  }

  function handleLogOut() {
    navigate("/login");
  }

  return (
    <div className="h-body background">
      <div className="admin-content shadow">
        <section className="section-1-admin">
          <div className="profile">
            <div className=" text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7968/7968657.png"
                alt="user"
                width="80%"
              />
            </div>

            <div className="text-center">
              {quiz.map((x, i) => (
                <Button
                  key={i}
                  variant="contained"
                  color="primary"
                  className="mb-3"
                >
                  {x.quizInformation.quizName}
                </Button>
              ))}
            </div>

            <div>
              <Button variant="contained" color="error" onClick={handleLogOut}>
                Logout
              </Button>
            </div>
          </div>
        </section>
        <section className="section-2-admin">
          <h1>Admin Panel</h1>
          <Box className="mb-5">
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "30%", marginTop: "25px" },
              }}
            >
              <TextField
                id="outlined-basic"
                label="Quiz Name"
                variant="outlined"
                color="secondary"
                className={lock ? "lock" : ""}
                value={quizInfo.quizName || ""}
                onChange={(e) =>
                  setQuizInfo({ ...quizInfo, quizName: e.target.value })
                }
              />

              <TextField
                id="outlined-basic"
                label="Quiz Duration"
                variant="outlined"
                color="secondary"
                className={lock ? "lock" : ""}
                value={quizInfo.quizDuration || ""}
                onChange={(e) =>
                  setQuizInfo({ ...quizInfo, quizDuration: e.target.value })
                }
              />

              <TextField
                id="outlined-basic"
                label="Secret key"
                variant="outlined"
                color="secondary"
                type="password"
                className={lock ? "lock" : ""}
                value={quizInfo.secretKey || ""}
                onChange={(e) =>
                  setQuizInfo({ ...quizInfo, secretKey: e.target.value })
                }
              />

              <TextField
                id="outlined-basic"
                label="Quiz Open"
                variant="outlined"
                color="secondary"
                className={lock ? "lock" : ""}
                value={quizInfo.quizOpen || ""}
                onChange={(e) =>
                  setQuizInfo({ ...quizInfo, quizOpen: e.target.value })
                }
              />

              <TextField
                id="outlined-basic"
                label="Quiz Description"
                variant="outlined"
                color="secondary"
                className={lock ? "lock" : ""}
                value={quizInfo.quizDescription || ""}
                onChange={(e) =>
                  setQuizInfo({ ...quizInfo, quizDescription: e.target.value })
                }
              />
            </Box>

            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "10%", marginTop: "25px" },
              }}
            >
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleLockQuiz}
              >
                Lock
              </Button>

              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={handleSaveQuiz}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Box className="mb-3">
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
            >
              <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                color="secondary"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "75%" },
              }}
            >
              <TextField
                id="outlined-basic"
                label="Option"
                variant="outlined"
                color="secondary"
                value={optVal}
                onChange={(e) => setOptVal(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "10%" },
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleAddOption}
              >
                Add
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleRender}
                size="large"
              >
                Done
              </Button>
            </Box>
          </Box>

          <Box className="mb-2">
            {options.map((x, i) => (
              <Button
                key={i}
                variant="outlined"
                color="secondary"
                className="me-3"
                onClick={() => setCorrAns(options[i])}
              >
                {x}
              </Button>
            ))}

            {corrAns ? (
              <Button variant="contained" color="success">
                {corrAns}
              </Button>
            ) : (
              ""
            )}
          </Box>

          <Box className="render-question">
            <h3>{question}</h3>
            {options.map((x) => (
              <li>{x}</li>
            ))}
            {corrAns ? (
              <p className="text-success">Correct Answer: {corrAns}</p>
            ) : (
              ""
            )}
          </Box>
        </section>
      </div>
    </div>
  );
}
