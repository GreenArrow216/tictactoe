import { useState } from 'react'
import './App.css'

type GridValue = undefined | 0 | 1

type GridItem = [[GridValue, GridValue, GridValue], [GridValue, GridValue, GridValue], [GridValue, GridValue, GridValue]]

const winnerCombos = [
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
    return winnerCombos.some(winnerCombo =>
      changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] !== undefined &&
      changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] === changedFields[winnerCombo.combo.secondCell[0]][winnerCombo.combo.secondCell[1]] &&
      changedFields[winnerCombo.combo.firstCell[0]][winnerCombo.combo.firstCell[1]] === changedFields[winnerCombo.combo.thirdCell[0]][winnerCombo.combo.thirdCell[1]])
  }

  const onCellClick = (i: number, j: number) => {
    const changedFields = structuredClone(filledFields)
    changedFields[i][j] = user
    setFilledFields(changedFields)
    if (winnerCalculate(changedFields)) {
      console.log('winner is', user ? 'O' : 'X')
      alert(`Winner is ${user ? 'O' : 'X'}`)
    } else {
      changeUser((prevUser) => (prevUser === 0 ? 1 : 0));
    }
    
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
                    {column === undefined ? ' ' : column ? <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target"><circle cx="12" cy="12" r="10"></circle></svg> // O
                      : <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
