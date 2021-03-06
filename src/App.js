import Header from './components/Navbar';
import './App.css';
import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import GameBox from './components/GameBox';
import SpinTable from './components/SpinTable';
import Footer from './components/Footer';

function App() {
  const [userName, setUserName] = useState("Guest");
  const [loggedin, setLoggedin] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [res, setRes] = useState(['-', '-', '-']);
  const [spinHistory, setSpinHistory] = useState([]);
  const [winningAmount, setWinningAmount] = useState(0);
  const [incId, setIncId] = useState(false);
  const [incTime, setIncTime] = useState(false);

  const nextSpin = () => {
    if (winningAmount < 1 && loggedin) {
      return;
    }

    const a = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    const b = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    const c = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    setRes([a, b, c]);

    const id = spinHistory.length + 1;
    const time = new Date();
    const hr = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
    const amOrpm = hr < 12 ? "pm" : "am";
    const min = time.getMinutes();
    console.log(time);

    setSpinHistory([...spinHistory, {
      id,
      slot1: a,
      slot2: b,
      slot3: c,
      date: time,
      time: `${hr}:${min} ${amOrpm}`
    }])

    checkIfWon([a, b, c]);
  }

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem('user'));

    if (currUser) {
      setUserName(currUser.userName);
      setWinningAmount(currUser.winningAmount);
      setLoggedin(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ userName, winningAmount }));
  }, [winningAmount]);

  const checkIfWon = (res) => {
    res.sort();
    console.log(res[0], res[1], res[2])

    if (res[0] === res[2]) {
      if (res[0] === 7) {
        setWinningAmount(winningAmount + 10 - 1);
      } else {
        setWinningAmount(winningAmount + 5 - 1);
      }
    }
    else if (res[0] === res[1] || res[1] === res[2]) {
      setWinningAmount(winningAmount + 0.5 - 1);
    } else {
      setWinningAmount(winningAmount + 0 - 1);
    }

  }

  const login = (userName) => {
    const res = JSON.parse(localStorage.getItem('users'));
    if (res !== null) {
      const existingUser = res.filter((item) => item.user === userName);

      if (existingUser.length === 0) {
        localStorage.setItem('users', JSON.stringify(([...res, { user: userName, amount: 10 }])));
        setWinningAmount(10);
      } else {
        setWinningAmount(existingUser[0].amount);
      }
    } else {
      localStorage.setItem('users', JSON.stringify([{ user: userName, amount: 10 }]));
      setWinningAmount(10);

    }
    setLoggedin(true);
    setUserName(userName);
    setSpinHistory([]);
    setRes(['-', '-', '-']);

    localStorage.setItem('user', JSON.stringify({ userName, winningAmount }));

  }

  const resetSpin = () => {
    setRes(['7', '7', '7']);
  }

  const logout = (userName) => {

    const res = JSON.parse(localStorage.getItem('users'));

    const userIndex = res.findIndex((item) => item.user === userName);

    res.splice(userIndex, 1, { user: userName, amount: winningAmount })

    localStorage.setItem('users', JSON.stringify(([...res])));
    setLoggedin(false);
    setWinningAmount(0);
    setUserName("Guest");
    setRes(['-', '-', '-']);

    localStorage.removeItem('user');
  }

  const sortBy = (val) => {
    if (val === "id") {
      if (incId) {
        spinHistory.sort((a, b) => a.id - b.id);
      } else {
        spinHistory.sort((a, b) => b.id - a.id);
      }
      setIncId(!incId);
    } else {
      if (incTime) {
        spinHistory.sort((a, b) => a.date - b.date);
      } else {
        spinHistory.sort((a, b) => b.date - a.date);
      }
      setIncTime(!incTime);
    }
    setSpinHistory([...spinHistory]);
  }

  const start = () => {
    setStartGame(false);
  }

  return (
    <>
      <div className="App">
        <Header login={login} logout={logout} userName={userName} loggedin={loggedin} winningAmount={winningAmount} />

        {!startGame ? (
          <Button onClick={() => setStartGame(true)}>Start Game</Button>
        ) : null}

        <div className="gamecard">
          <GameBox res={res} startGame={startGame} resetSpin={resetSpin} start={start} nextSpin={nextSpin} />
        </div>
        {
          spinHistory.length > 0 ? (<SpinTable spinHistory={spinHistory} sortBy={sortBy} />) : null
        }
        <Footer />
      </div>

    </>
  );
}

export default App;
