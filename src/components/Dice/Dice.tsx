import { useEffect, useState } from "react";
import "./Dice.scss";

function Dice() {
  const [visibleDots, setVisibleDots] = useState({
    dot1: true,
    dot2: false,
    dot3: true,
    dot4: false,
    dot5: true,
    dot6: false,
    dot7: true,
  });

  useEffect(() => {
    const numRolled: number = 5;
    setRolledNum(numRolled);
  },[]);

  function setRolledNum(numRolled: number) {
    switch (numRolled) {
      case 1:
        setVisibleDots({
          dot1: false,
          dot2: false,
          dot3: false,
          dot4: true,
          dot5: false,
          dot6: false,
          dot7: false,
        });
        console.log("You rolled a 1");
        break;
      case 2:
        setVisibleDots({
          dot1: true,
          dot2: false,
          dot3: false,
          dot4: false,
          dot5: false,
          dot6: false,
          dot7: true,
        });
        console.log("You rolled a 2");
        break;
      case 3:
        setVisibleDots({
          dot1: true,
          dot2: false,
          dot3: false,
          dot4: true,
          dot5: false,
          dot6: false,
          dot7: true,
        });
        console.log("You rolled a 3");
        break;
      case 4:
        setVisibleDots({
          dot1: true,
          dot2: false,
          dot3: true,
          dot4: false,
          dot5: true,
          dot6: false,
          dot7: true,
        });
        console.log("You rolled a 4");
        break;
      case 5:
        setVisibleDots({
          dot1: true,
          dot2: false,
          dot3: true,
          dot4: true,
          dot5: true,
          dot6: false,
          dot7: true,
        });
        console.log("You rolled a 5");
        break;
      case 6:
        setVisibleDots({
          dot1: true,
          dot2: true,
          dot3: true,
          dot4: false,
          dot5: true,
          dot6: true,
          dot7: true,
        });
        console.log("You rolled a 6");
        break;
      default:
        setVisibleDots({
          dot1: false,
          dot2: false,
          dot3: false,
          dot4: true,
          dot5: false,
          dot6: false,
          dot7: false,
        });
        console.log("Roll failed, try again");
        break;
    }
  }

  return (
    <div className="dice">
      <div className="dice__col">
        <div className={visibleDots.dot1 ? "dice__dot" : "dice__dot--hidden"}></div>
        <div className={visibleDots.dot2 ? "dice__dot" : "dice__dot--hidden"}></div>
        <div className={visibleDots.dot3 ? "dice__dot" : "dice__dot--hidden"}></div>
      </div>
      <div className="dice__col">
        <div className={visibleDots.dot4 ? "dice__dot" : "dice__dot--hidden"}></div>
      </div>
      <div className="dice__col">
        <div className={visibleDots.dot5 ? "dice__dot" : "dice__dot--hidden"}></div>
        <div className={visibleDots.dot6 ? "dice__dot" : "dice__dot--hidden"}></div>
        <div className={visibleDots.dot7 ? "dice__dot" : "dice__dot--hidden"}></div>
      </div>
    </div>
  );
}

export default Dice;
