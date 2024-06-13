import React, { useState } from 'react';
import Results from '../Results/Results';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [choice, setChoice] = useState("None");
  const [choiceColor, setChoiceColor] = useState("");
  
  // States for main axes
  const [conservatism, setConservatism] = useState(0);
  const [capitalism, setCapitalism] = useState(0);
  const [authoritarianism, setAuthoritarianism] = useState(0);
  
  // Additional axes
  const [conservatives, setConservatives] = useState(0);
  const [labour, setLabour] = useState(0);
  const [greens, setGreens] = useState(0);
  const [libDems, setLibDems] = useState(0);
  const [reform, setReform] = useState(0);

  const [quizFinished, setQuizFinished] = useState(false);

  const next = () => {
    if (choice !== "None") {
      switch (question.axis) {
        case "conservatism":
          updateAxis(setConservatism, choice);
          break;
        case "progressivism":
          updateAxis(setConservatism, invertChoice(choice));
          break;
        case "capitalism":
          updateAxis(setCapitalism, choice);
          break;
        case "socialism":
          updateAxis(setCapitalism, invertChoice(choice));
          break;
        case "authoritarianism":
          updateAxis(setAuthoritarianism, choice);
          break;
        case "libertarianism":
          updateAxis(setAuthoritarianism, invertChoice(choice));
          break;
        case "Conservatives":
          updateAxis(setConservatives, choice);
          break;
        case "Labour":
          updateAxis(setLabour, choice);
          break;
        case "Greens":
          updateAxis(setGreens, choice);
          break;
        case "LibDems":
          updateAxis(setLibDems, choice);
          break;
        case "Reform":
          updateAxis(setReform, choice);
          break;
        default:
          break;
      }

      if (index + 1 < data.length) {
        setIndex(prevIndex => prevIndex + 1);
        setQuestion(data[index + 1]);
        setChoice("None");
        setChoiceColor("");
      } else {
        setQuizFinished(true); // Set quiz finished to true
      }
    }
  };

  const updateAxis = (setState, choice) => {
    if (choice === "SA") {
      setState(prevState => prevState + 2);
    } else if (choice === "A") {
      setState(prevState => prevState + 1);
    } else if (choice === "D") {
      setState(prevState => prevState - 1);
    } else if (choice === "SD") {
      setState(prevState => prevState - 2);
    }
  };

  const invertChoice = (choice) => {
    switch (choice) {
      case "SA":
        return "SD";
      case "A":
        return "D";
      case "D":
        return "A";
      case "SD":
        return "SA";
      default:
        return choice;
    }
  };

  const handleChoiceClick = (choice, color) => {
    setChoice(choice);
    setChoiceColor(color);
  };

  if (quizFinished) {
    return (
      <Results
        conservatism={conservatism}
        capitalism={capitalism}
        authoritarianism={authoritarianism}
        conservatives={conservatives}
        labour={labour}
        greens={greens}
        libDems={libDems}
        reform={reform}
      />
    );
  }

  return (
    <div className='container'>
      <h1>Take the quiz</h1>
      <hr />
      <h2>{question.question}</h2>
      <ul>
        <li
          className='strongly-agree'
          onClick={() => handleChoiceClick("SA", "#006400")}
          style={{ backgroundColor: choice === "SA" ? "#006400" : choiceColor === "#006400" ? "#006400" : "" }}
        >
          Strongly Agree
        </li>
        <li
          className='somewhat-agree'
          onClick={() => handleChoiceClick("A", "#477d3c")}
          style={{ backgroundColor: choice === "A" ? "#477d3c" : choiceColor === "#477d3c" ? "#477d3c" : "" }}
        >
          Somewhat Agree
        </li>
        <li
          className='neutral'
          onClick={() => handleChoiceClick("N", "#686868")}
          style={{ backgroundColor: choice === "N" ? "#686868" : choiceColor === "#686868" ? "#686868" : "" }}
        >
          No Opinion/Unsure
        </li>
        <li
          className='somewhat-disagree'
          onClick={() => handleChoiceClick("D", "#7d3c3c")}
          style={{ backgroundColor: choice === "D" ? "#7d3c3c" : choiceColor === "#7d3c3c" ? "#7d3c3c" : "" }}
        >
          Somewhat Disagree
        </li>
        <li
          className='strongly-disagree'
          onClick={() => handleChoiceClick("SD", "#8B0000")}
          style={{ backgroundColor: choice === "SD" ? "#8B0000" : choiceColor === "#8B0000" ? "#8B0000" : "" }}
        >
          Strongly Disagree
        </li>
      </ul>
      <button className='next' onClick={next}>Next</button>
      <div className="index">{index + 1} of {data.length} Questions</div>

      {/* <div>CON: {conservatism}</div>
      <br></br>
      <div>CAP: {capitalism}</div>
      <br></br>
      <div>AUTH: {authoritarianism}</div> */}
    </div>
  );
};

export default Quiz;
