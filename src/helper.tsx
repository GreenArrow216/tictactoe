import confetti from "canvas-confetti";
import { GridItem } from "./components/tictactoe";
import { WinnerCombo, winnerCombos } from "./constants";

type CalculateWinnerProps = {
  user: 0 | 1;
  tictactoeCells: GridItem;
};

type CalculateWinnerOutputProps = {
  user: "O" | "X";
  winnerCombo: WinnerCombo[];
  isWinner: boolean;
};

export const calculateWinner = (
  props: CalculateWinnerProps
): CalculateWinnerOutputProps => {
  const { user, tictactoeCells } = props;
  return {
    user: user ? "O" : "X",
    winnerCombo: winnerCombos.filter(
      (winnerCombo) =>
        tictactoeCells[winnerCombo.combo.firstCell[0]][
          winnerCombo.combo.firstCell[1]
        ] !== undefined &&
        tictactoeCells[winnerCombo.combo.firstCell[0]][
          winnerCombo.combo.firstCell[1]
        ] ===
          tictactoeCells[winnerCombo.combo.secondCell[0]][
            winnerCombo.combo.secondCell[1]
          ] &&
        tictactoeCells[winnerCombo.combo.firstCell[0]][
          winnerCombo.combo.firstCell[1]
        ] ===
          tictactoeCells[winnerCombo.combo.thirdCell[0]][
            winnerCombo.combo.thirdCell[1]
          ]
    ),
    isWinner: winnerCombos.some(
      (winnerCombo) =>
        tictactoeCells[winnerCombo.combo.firstCell[0]][
          winnerCombo.combo.firstCell[1]
        ] !== undefined &&
        tictactoeCells[winnerCombo.combo.firstCell[0]][
          winnerCombo.combo.firstCell[1]
        ] ===
          tictactoeCells[winnerCombo.combo.secondCell[0]][
            winnerCombo.combo.secondCell[1]
          ] &&
        tictactoeCells[winnerCombo.combo.firstCell[0]][
          winnerCombo.combo.firstCell[1]
        ] ===
          tictactoeCells[winnerCombo.combo.thirdCell[0]][
            winnerCombo.combo.thirdCell[1]
          ]
    ),
  };
};

export const compareArrays = (a: unknown[], b: unknown[]) => {
  if (a.length !== b.length) return false;
  else {
    // Comparing each element of your array
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
};

export const confettiPour = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 60 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};
