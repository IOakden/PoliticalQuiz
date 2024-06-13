import React from 'react';
import './Results.css';
import ConservativesLogo from '../../assets/images/ConservativesLogo.png';
import LabourLogo from '../../assets/images/LabourLogo.png';
import LibDemsLogo from '../../assets/images/LibDemsLogo.png';
import ReformUKLogo from '../../assets/images/ReformUKLogo.png';
import GreenLogo from '../../assets/images/GreensLogo.png';

const Results = ({ conservatism, capitalism, authoritarianism, conservatives, labour, libDems, greens, reform }) => {
  // Define the positions of the parties
  const parties = {
    Conservatives: { conservatism: 5, capitalism: 5, authoritarianism: 10 }, // Example values
    Labour: { conservatism: -5, capitalism: -5, authoritarianism: 10 },
    LibDems: { conservatism: -5, capitalism: 0, authoritarianism: -5 },
    ReformUK: { conservatism: 10, capitalism: 5, authoritarianism: -5 },
    Green: { conservatism: -10, capitalism: -5, authoritarianism: 5 }
  };

  const partyLogos = {
    Conservatives: ConservativesLogo,
    Labour: LabourLogo,
    LibDems: LibDemsLogo,
    ReformUK: ReformUKLogo,
    Green: GreenLogo,
  };


  const partyPreference = {
    Conservatives: conservatives,
    Labour: labour,
    LibDems: libDems,
    ReformUK: reform,
    Green: greens
  };


  // Map scores to circle positions
  const mapScoreToCirclePosition = (score) => {
    if (score >= 10) return 0;
    if (score >= 5) return 1;
    if (score >= 0) return 2;
    if (score <= -10) return 4;
    if (score <= -5) return 3;
    return 2;  // Default for scores in between
  };

  // Calculate the cumulative difference in circle positions
  const calculateDifference = (user, party) => {
    const userConPos = mapScoreToCirclePosition(user.conservatism);
    const partyConPos = mapScoreToCirclePosition(party.conservatism);
    const userCapPos = mapScoreToCirclePosition(user.capitalism);
    const partyCapPos = mapScoreToCirclePosition(party.capitalism);
    const userAuthPos = mapScoreToCirclePosition(user.authoritarianism);
    const partyAuthPos = mapScoreToCirclePosition(party.authoritarianism);

    return (
      Math.abs(userConPos - partyConPos) +
      Math.abs(userCapPos - partyCapPos) +
      Math.abs(userAuthPos - partyAuthPos)
    );
  };

  // Store the user's positions
  const userPosition = { conservatism, capitalism, authoritarianism };

  // Calculate the differences
  const differences = Object.keys(parties).map(party => ({
    name: party,
    difference: calculateDifference(userPosition, parties[party]) - (partyPreference[party])
  }));

  // Sort the parties by difference
  differences.sort((a, b) => a.difference - b.difference);

  // Render the circles based on the score
  const renderCircles = (score, classes) => {
    const position = mapScoreToCirclePosition(score);
    return (
      <div className='circle-container'>
        {position === 0 ? <span className={classes[0]} /> : <span className='empty-circle' />}
        {position === 1 ? <span className={classes[1]} /> : <span className='empty-circle' />}
        {position === 2 ? <span className={classes[2]} /> : <span className='empty-circle' />}
        {position === 3 ? <span className={classes[3]} /> : <span className='empty-circle' />}
        {position === 4 ? <span className={classes[4]} /> : <span className='empty-circle' />}
      </div>
    );
  };

  // Define gradients for each party
  const partyGradients = {
    Conservatives: 'linear-gradient(#4464ff, #445477)',
    Labour: 'linear-gradient(#dd4444, #894333)',
    LibDems: 'linear-gradient(#df9922, #775f44)',
    ReformUK: 'linear-gradient(#4494ff, #449497)',
    Green: 'linear-gradient(#22cc22, #448844)'
  };

  return (
    <div className='results-container'>
      <div className='results-content'>
        <h1 className='results-title'>Ideological Results</h1>
        <hr />
        <br />
        <div className='result-row'>
          <span>Conservatism</span>
          {renderCircles(conservatism, ['con-circle', 'modcon-circle', 'filled-circle', 'modprog-circle', 'prog-circle'])}
          <span>Progressivism</span>
        </div>
        <div className='result-row'>
          <span>Capitalism</span>
          {renderCircles(capitalism, ['cap-circle', 'modcap-circle', 'filled-circle', 'modsoc-circle', 'soc-circle'])}
          <span>Socialism</span>
        </div>
        <div className='result-row'>
          <span>Authoritarianism</span>
          {renderCircles(authoritarianism, ['auth-circle', 'modauth-circle', 'filled-circle', 'modlib-circle', 'lib-circle'])}
          <span>Libertarianism</span>
        </div>
      </div>
      <br />
      <div className='results-content'>
        <h1 className='results-title'>Party Similarities</h1>
        <hr />
        <br />
        <ul className='party-list'>
          {differences.map(party => {
            const progress = 12 - party.difference;
            return (
              <li key={party.name} className='party-list-item' style={{ backgroundImage: partyGradients[party.name] }}>
                <img src={partyLogos[party.name]} alt={`${party.name} Logo`} className='party-logo' />
                <span className='party-name'>{party.name}</span>
                <div className='progress-bar'>
                  <div className='progress' style={{ width: `${(progress / 12) * 100}%` }}></div>
                </div>
                <span className='party-difference'>Difference: {party.difference}</span>
              </li>
            );
          })}
        </ul>
        {/* <div className='debug-info'>
        <h2>User Values</h2>
        <p>Conservatism: {conservatism}, Mapped Position: {mapScoreToCirclePosition(conservatism)}</p>
        <p>Capitalism: {capitalism}, Mapped Position: {mapScoreToCirclePosition(capitalism)}</p>
        <p>Authoritarianism: {authoritarianism}, Mapped Position: {mapScoreToCirclePosition(authoritarianism)}</p>
        <h2>Party Values</h2>
        {Object.keys(parties).map(party => (
          <div key={party} className='party-debug-info'>
            <h3>{party}</h3>
            <p>Conservatism: {parties[party].conservatism}, Mapped Position: {mapScoreToCirclePosition(parties[party].conservatism)}</p>
            <p>Capitalism: {parties[party].capitalism}, Mapped Position: {mapScoreToCirclePosition(parties[party].capitalism)}</p>
            <p>Authoritarianism: {parties[party].authoritarianism}, Mapped Position: {mapScoreToCirclePosition(parties[party].authoritarianism)}</p>
          </div>
        ))}
      </div>
        <div>Green Support: {greens }</div> */}
      </div>
    </div>
  );
};

export default Results;
