import React, { useState, useEffect } from "react";
// for the snowfall
import Snowfall from 'react-snowfall';
import "./App.scss";
import Category from "./components/Category/Category";
import FinalJeopardy from "./components/FinalJeopardy/FinalJeopardy";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import ButtonSwitchGame from "./components/ButtonSwitchGame/ButtonSwitchGame";
import data from "./data/data";
// import dataAlt from "./data/dataAlt";
// import dataAlt2 from "./data/dataAlt2";
// import dataAlt3 from "./data/dataAlt3";
// import dataAlt4 from "./data/dataAlt4";
// import dataAlt5 from "./data/dataAlt5";
// import dataAlt6 from "./data/dataAlt6";
// import dataAlt7 from "./data/dataAlt7";
// import dataAlt8 from "./data/dataAlt8";
// import dataAlt9 from "./data/dataAlt9";
// import dataAlt10 from "./data/dataAlt10";
// import dataAlt11 from "./data/dataAlt11";
// import finaljep from "./data/finaljep";
import introMusic from "./assets/music/intro.mp3";
// import rallymascot from "./assets/img/xmasrallymascot.png";
// import snowflake from "./assets/icons/snowflakeicon.svg";
// import santa from "./assets/img/drunksanta.png";

const gameData = [
  data,
  // dataAlt,
  // dataAlt2,
  // dataAlt3,
  // dataAlt4,
  // dataAlt5,
  // dataAlt6,
  // dataAlt7,
  // dataAlt8,
  // dataAlt9,
  // dataAlt10,
  // dataAlt11,
];

function App() {
  const [categories, setCategories] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [finalJeopardyStatus, setFinalJeopardyStatus] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  // const [finalJepQ, setFinalJepQ] = useState(finaljep[0]);
  const [currGame, setCurrGame] = useState(null);
  const [gameIndex, setGameIndex] = useState({});
  const [snowfall, setSnowfall] = useState(true);

  const addToRevealed = () => {
    const newlyRevealed = [...revealed, revealed.length + 1];
    setRevealed(newlyRevealed);
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(5));
  };

  const setNewGame = (num) => {
    // setPlayIntro(false);
    let quest = {};
    let counter = 0;

    if (!gameIndex[num]) {
      do {
        quest = gameData[num][getRandomInt()].questions[getRandomInt()];
        if (!quest["dailydouble"]) {
          quest["dailydouble"] = true;
          counter++;
        }
      } while (counter < 2);
    }

    let thing = {};
    thing[num] = true;

    // reset state variables
    setRevealed([]);
    setFinalJeopardyStatus(false);
    setCategories(gameData[num]);
    // setFinalJepQ(finaljep[num]);
    setCurrGame(num);
    setGameIndex({ ...gameIndex, ...thing });
  };

  useEffect(() => {
    setNewGame(0);
    // eslint-disable-next-line
  }, []);

  const handlesClick = (num) => {
    setNewGame(num);
  };

  const handlesFinalJepClick = () => {
    setFinalJeopardyStatus(!finalJeopardyStatus);
  };

  const handlesMusicClick = () => {
    setPlayIntro(!playIntro);
  };

  const handlesSnowfall = () => {
    setSnowfall(!snowfall);
  }


  return (
    <div className="app">
      {/* <img className="app__snowControl" src={snowflake} alt="snowflake" onClick={handlesSnowfall}/> */}
      {/* <img src={"https://www.animatedimages.org/data/media/359/animated-santa-claus-image-0420.gif"} className={`app__gif ${playIntro ? "app__gif-visible" : ""}`} alt="santa"/> */}
      {/* {snowfall && 
      <Snowfall 
      snowflakeCount={200}
      />
      } */}
      {playIntro && <audio autoplay="autoplay" src={introMusic}></audio>}
      <div className="app__heading-wrap">
        {/* <img className="app__heading-img" src={santa} alt="rallylogo" /> */}
        <h1
          className={`app__heading ${playIntro ? "app__heading--active" : ""}`}
          onClick={handlesMusicClick}
        >
          Jeopardy
        </h1>

      </div>
      <div className="app__cards">
        {categories &&
          categories.map((category) => {
            return (
              <Category
                category={category}
                addToRevealed={addToRevealed}
                currGame={currGame}
              />
            );
          })}
      </div>

      {/* <Scoreboard /> */}
      {/* <div className="app__games">
        <div className="app__button-wrap">
          {gameData.map((game, i) => {
            return (
              <ButtonSwitchGame
                gameNum={i}
                handlesClick={handlesClick}
                currGame={currGame}
              />
            );
          })}
        </div>
      </div> */}
      {/* <button className="app__button-finaljep" onClick={handlesFinalJepClick}>
        {`${finalJeopardyStatus ? "Back" : "Final Jeopardy"}`}
      </button> */}
    </div>
  );
}

export default App;
