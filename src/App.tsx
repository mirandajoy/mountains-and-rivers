import "./App.scss";
import DiceGroup from "./components/DiceGroup/DiceGroup";
import PlayerList from "./components/PlayerList/PlayerList";

function App() {
  return (
    <div className="app">
      <PlayerList />
      <DiceGroup />
    </div>
  );
}

export default App;
