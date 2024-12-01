import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'


type GridValue = undefined | 0 | 1

type GridItem = [[GridValue, GridValue, GridValue], [GridValue, GridValue, GridValue], [GridValue, GridValue, GridValue]]

type CellValues = [0 | 1 | 2, 0 | 1 | 2]

type WinnerCells = { firstCell: CellValues, secondCell: CellValues, thirdCell: CellValues }

type WinnerCombo = { combo: WinnerCells }

const winColor = '#1cff1d'

const winnerCombos: WinnerCombo[] = [
  { combo: { firstCell: [0, 0], secondCell: [0, 1], thirdCell: [0, 2] } },
  { combo: { firstCell: [1, 0], secondCell: [1, 1], thirdCell: [1, 2] } },
  { combo: { firstCell: [0, 2], secondCell: [1, 2], thirdCell: [2, 2] } },
  { combo: { firstCell: [2, 0], secondCell: [2, 1], thirdCell: [2, 2] } },
  { combo: { firstCell: [0, 0], secondCell: [1, 0], thirdCell: [2, 0] } },
  { combo: { firstCell: [0, 0], secondCell: [1, 1], thirdCell: [2, 2] } },
  { combo: { firstCell: [0, 2], secondCell: [1, 1], thirdCell: [2, 0] } },
  { combo: { firstCell: [0, 1], secondCell: [1, 1], thirdCell: [2, 1] } },
]

function App() {
  const [user, changeUser] = useState<0 | 1>(0)
  const initialFields: GridItem = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]
  const [filledFields, setFilledFields] = useState<GridItem>(initialFields)

  const winnerCalculate = (changedFields: GridItem) => {
    return {
      user: user ? 'O' : 'X',
      winnerCombo: winnerCombos.filter(winnerCombo =>
        changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] !== undefined &&
        changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] === changedFields[winnerCombo.combo.secondCell[0]][winnerCombo.combo.secondCell[1]] &&
        changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] === changedFields[winnerCombo.combo.thirdCell[0]][winnerCombo.combo.thirdCell[1]]),
      isWinner: winnerCombos.some(winnerCombo =>
        changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] !== undefined &&
        changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] === changedFields[winnerCombo.combo.secondCell[0]][winnerCombo.combo.secondCell[1]] &&
        changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] === changedFields[winnerCombo.combo.thirdCell[0]][winnerCombo.combo.thirdCell[1]])
    }
  }

  const onCellClick = (i: number, j: number) => {
    const changedFields = structuredClone(filledFields)
    changedFields[i][j] = user
    setFilledFields(changedFields)
    if (winnerCalculate(changedFields).isWinner) {
      confettiPour()
      console.log('winner is', user ? 'O' : 'X')
    } else {
      changeUser((prevUser) => (prevUser === 0 ? 1 : 0));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const compareArrays = (a: any[], b: any[]) => {
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


  const colorMatcher = (user: 0 | 1, i: number, j: number) => {
    const currentCell = [i, j]

    if (winnerCalculate(filledFields).isWinner) {
      const { firstCell, secondCell, thirdCell } = winnerCalculate(filledFields).winnerCombo[0].combo
      return compareArrays(firstCell, currentCell) || compareArrays(secondCell, currentCell) || compareArrays(thirdCell, currentCell) ? winColor : user ? 'blue' : 'red'
    } else {
      return user ? 'blue' : 'red'
    }
  }

  const confettiPour = () => {
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
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  return (
    <>
      <div className='tic-tac-box'>
        <table>
          <tbody>
            {filledFields.map((row, i) =>
              <tr key={i}>
                {row.map((column, j) =>
                  <td onClick={() => onCellClick(i, j)} key={j}>
                    {column === undefined ? ' ' : column ? <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={colorMatcher(1, i, j)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-target ${colorMatcher(0, i, j) === winColor ? 'winner-cell' : ''}`}><circle cx="12" cy="12" r="8"></circle></svg> // O
                      : <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={colorMatcher(0, i, j)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-x ${colorMatcher(0, i, j) === winColor ? 'winner-cell' : ''}`}><line x1="18" y1="6" x2="6" y2="18" className='backslash'></line><line x1="6" y1="6" x2="18" y2="18" className='slash'></line></svg>}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
          <div>
            <p className='glow' style={{height:'20px'}}>{winnerCalculate(filledFields).isWinner ?`The winner is ${user ? 'O' : 'X'}` : ''}</p>
          </div>
      </div>
    </>
  )
}

export default App
