import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Quiz from './Components/Quiz/Quiz';
import ParticlesComponent from './Components/Particles/Particles';
import Results from './Components/Results/Results';

const App = () => {
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({});

  const handleFinish = (scores) => {
    setScores(scores);
    setShowResults(true);
  };

  return (
    <>
      
      <ParticlesComponent id="particles" />
      <div className="QuizWrapper">
        {showResults ? (
          <Results scores={scores} />
        ) : (
          <Quiz onFinish={handleFinish} />
        )}
      </div>
      <Navbar />
    </>
  );
};

export default App;
