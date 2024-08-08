import "./App.scss";
import Board from "./components/Board/Board";
import DiceGroup from "./components/DiceGroup/DiceGroup";
import PlayerList from "./components/PlayerList/PlayerList";

function App() {
  return (
    <div className="app">
      <Board />
      <div className="app__actions">
        <PlayerList />
        <DiceGroup />
      </div>
    </div>
  );
}

export default App;
