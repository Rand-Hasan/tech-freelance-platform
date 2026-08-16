import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Questions/styles/Assessment.css";


/* =====================================================
   QUESTIONS
===================================================== */

const questions = [
  {
    id: 1,

    question:
      "Which HTTP method is used to update existing data in a REST API?",

    options: [
      "GET",
      "POST",
      "PUT / PATCH",
      "DELETE",
    ],
  },

  {
    id: 2,

    question:
      "Which language is primarily used with React?",

    options: [
      "Python",
      "JavaScript",
      "Java",
      "C++",
    ],
  },

  {
    id: 3,

    question:
      "What does CSS stand for?",

    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
  },

  {
    id: 4,

    question:
      "Which React hook is used to manage component state?",

    options: [
      "useEffect",
      "useContext",
      "useState",
      "useRef",
    ],
  },

  {
    id: 5,

    question:
      "Which command installs a package using npm?",

    options: [
      "npm install",
      "npm start",
      "npm create",
      "npm package",
    ],
  },

  {
    id: 6,

    question:
      "What is the main purpose of an API?",

    options: [
      "To style a website",
      "To allow applications to communicate",
      "To create images",
      "To manage CSS",
    ],
  },

  {
    id: 7,

    question:
      "Which HTML element creates a hyperlink?",

    options: [
      "<link>",
      "<href>",
      "<a>",
      "<url>",
    ],
  },

  {
    id: 8,

    question:
      "Which Git command uploads commits to a remote repository?",

    options: [
      "git pull",
      "git clone",
      "git push",
      "git commit",
    ],
  },

  {
    id: 9,

    question:
      "Which of the following is a JavaScript data type?",

    options: [
      "String",
      "CSS",
      "HTML",
      "Component",
    ],
  },

  {
    id: 10,

    question:
      "What is React mainly used for?",

    options: [
      "Building user interfaces",
      "Managing databases",
      "Creating operating systems",
      "Writing SQL queries",
    ],
  },
];


function AssessmentQuestionsf() {

  const navigate = useNavigate();

  const location = useLocation();


  /* =====================================================
     LEVEL
  ===================================================== */

  const level =
    location.state?.level || "mid";


  /* =====================================================
     CURRENT QUESTION
  ===================================================== */

  const [questionNumber, setQuestionNumber] =
    useState(1);


  /* =====================================================
     ANSWERS
  ===================================================== */

  const [answers, setAnswers] =
    useState({});


  /* =====================================================
     CURRENT QUESTION DATA
  ===================================================== */

  const currentQuestion =
    questions.find(
      (question) =>
        question.id === questionNumber
    );


  /* =====================================================
     SELECTED ANSWER
  ===================================================== */

  const selectedAnswer =
    answers[questionNumber];


  /* =====================================================
     PROGRESS
  ===================================================== */

  const progress =
    questionNumber * 10;


  /* =====================================================
     SELECT ANSWER
  ===================================================== */

  const handleAnswer = (answer) => {

    setAnswers((previousAnswers) => ({
      ...previousAnswers,

      [questionNumber]: answer,
    }));

  };


  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const handleNext = () => {

    if (!selectedAnswer) {

      alert("Please select an answer first.");

      return;
    }


    /* Question 1 → Question 2 */

    if (questionNumber < 10) {

      setQuestionNumber(
        (previous) => previous + 1
      );

      return;
    }


    /* =================================================
       FINISH
    ================================================= */

    console.log("Selected level:", level);

    console.log("Answers:", answers);

    alert("Assessment completed!");
  };


  /* =====================================================
     PREVIOUS QUESTION
  ===================================================== */

  const handlePrevious = () => {

    /* Question 1 → back to level */

    if (questionNumber === 1) {

      navigate("/AssessmentLevel");

      return;
    }


    /* Question 5 → Question 4 */

    setQuestionNumber(
      (previous) => previous - 1
    );
  };


  return (

    <div className="assessment-container">
   

  
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="assessment-header">

        <div className="assessment-title">

          <h2>
            Technical Assessment
          </h2>

          <p>
            Select your level, then answer 10 questions
          </p>

        </div>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="assessment-progress">

          <div className="progress-top">

            <span>
              Progress
            </span>

            <span>
              Question {questionNumber} of 10
            </span>

          </div>


          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="assessment-main">

        <div className="question-content">


          {/* =================================================
              QUESTION CARD
          ================================================= */}

          <div className="question-card">


            {/* QUESTION NUMBER */}

            <div className="question-number">

              QUESTION {questionNumber} OF 10

            </div>


            {/* QUESTION */}

            <h1>
              {currentQuestion.question}
            </h1>


            {/* =================================================
                ANSWERS
            ================================================= */}

            <div className="answers">

              {currentQuestion.options.map(
                (option, index) => {

                  const letter =
                    String.fromCharCode(
                      65 + index
                    );


                  const isSelected =
                    selectedAnswer === option;


                  return (

                    <div
                      key={option}
                      className={`answer ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleAnswer(option)
                      }
                    >

                      <div className="answer-letter">

                        {letter}

                      </div>

                      <span>
                        {option}
                      </span>

                    </div>

                  );

                }
              )}

            </div>

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="question-buttons">


            {/* PREVIOUS */}

            <button
              className="previous-button"
              onClick={handlePrevious}
            >
              ← Previous
            </button>


            {/* NEXT */}

            <button
              className="next-button"
              onClick={handleNext}
            >

              {questionNumber === 10
                ? "Submit Assessment ✓"
                : "Next Question →"}

            </button>

          </div>

        </div>

      </main>

    </div>

  );
}


export default AssessmentQuestionsf;