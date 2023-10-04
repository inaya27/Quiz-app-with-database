import { useEffect, useState } from "react";
import { fbGet } from "../config/firebasemethods";
import { Button } from "@mui/material";

export default function Student() {
  const [question, setQuestion] = useState([]);
  const [renderQuiz, setRenderQuiz] = useState([]);
  console.log(renderQuiz);

  useEffect(() => {
    fbGet("quiz")
      .then((res) => setQuestion([...Object.values(res)]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-body background">
      <div className="student-content">
        <h1>Choose a Quiz</h1>
        <div>
          {question.map((x, i) => (
            <Button
              key={i}
              variant="contained"
              color="secondary"
              onClick={() => setRenderQuiz([{ ...question[i] }])}
            >
              {x.quizInformation.quizName}
            </Button>
          ))}
        </div>

        <div className="mt-5">
          {renderQuiz.map((x, i) => (
            <div key={i}>
              <h4>Your quiz of {x.quizInformation.quizName} is Started...</h4>
              <h3>
                {x.quizQuestions.map((r) => (
                  <div>
                    <p>{r.question}</p>
                    <p>
                      {r.options.map((o, i) => (
                        <Button>{o}</Button>
                      ))}
                    </p>
                  </div>
                ))}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
