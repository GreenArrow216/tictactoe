import { useState } from "react";

import Reset from "../assets/reset.svg";
import { calculateWinner, compareArrays, confettiPour } from "../helper";
import X from "./icons/X";
import O from "./icons/O";

type GridValue = undefined | 0 | 1;

export type GridItem = [
  [GridValue, GridValue, GridValue],
  [GridValue, GridValue, GridValue],
  [GridValue, GridValue, GridValue]
];

const winColor = "#1cff1d";

const TicTacToe = () => {
  const [user, changeUser] = useState<0 | 1>(0);
  const initialFields: GridItem = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
  const [filledFields, setFilledFields] = useState<GridItem>(initialFields);

  const onCellClick = (i: number, j: number) => {
    const changedFields = structuredClone(filledFields);
    changedFields[i][j] = user;
    if (calculateWinner({ tictactoeCells: filledFields, user }).isWinner) {
      changeUser((prevUser) => (prevUser === 0 ? 1 : 0));
      return;
    }
    setFilledFields(changedFields);
    if (calculateWinner({ tictactoeCells: changedFields, user }).isWinner) {
      confettiPour();
      console.log("winner is", user ? "O" : "X");
    } else {
      changeUser((prevUser) => (prevUser === 0 ? 1 : 0));
    }
  };

  const colorMatcher = (user: 0 | 1, i: number, j: number) => {
    const currentCell = [i, j];
    if (calculateWinner({ tictactoeCells: filledFields, user }).isWinner) {
      const { firstCell, secondCell, thirdCell } = calculateWinner({
        tictactoeCells: filledFields,
        user,
      }).winnerCombo[0].combo;
      return compareArrays(firstCell, currentCell) ||
        compareArrays(secondCell, currentCell) ||
        compareArrays(thirdCell, currentCell)
        ? winColor
        : user
        ? "blue"
        : "red";
    } else {
      return user ? "blue" : "red";
    }
  };

  const findDraw = () => {
    let fullyFilled = false;
    filledFields.forEach((cells) => {
      fullyFilled = !cells.some((cell) => cell === undefined);
    });
    return fullyFilled;
  };

  return (
    <div className="tic-tac-box">
      <div className="tic-tac-interactive">
        <div>
          <table>
            <tbody>
              {filledFields.map((row, i) => (
                <tr key={i}>
                  {row.map((column, j) => (
                    <td onClick={() => onCellClick(i, j)} key={j}>
                      {column === undefined ? (
                        " "
                      ) : column ? (
                        <O strokeColor={colorMatcher(1, i, j)} />
                      ) : (
                        <X strokeColor={colorMatcher(0, i, j)} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div>
                <table>
                    <thead>
                        <tr>
                            <th>Red</th>
                            <th>Blue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>7</td><td>8</td></tr>
                    </tbody>
                </table>
            </div> */}
        <div>
          <button
            className="reset"
            onClick={() => setFilledFields(initialFields)}
          >
            <img src={Reset} alt={"reset.svg"} />
          </button>
        </div>
      </div>
      <div>
        <p className="glow">
          {calculateWinner({ tictactoeCells: filledFields, user }).isWinner
            ? `The winner is ${user ? "O" : "X"}`
            : findDraw()
            ? "Oh no it's a draw"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default TicTacToe;
