import { useEffect, useState } from "react";
import "./Dice.scss";

function Dice({ rolledNum }: { rolledNum: number }) {
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
    setRolledNum(rolledNum);
  }, [rolledNum]);

  function setRolledNum(rolledNum: number) {
    switch (rolledNum) {
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
