import { useState } from 'react'
import './App.css'

type GridValue = undefined | 0|1

type GridItem = [[GridValue, GridValue, GridValue],[GridValue, GridValue, GridValue],[GridValue, GridValue, GridValue]]

function App() {
  const [user, changeUser] = useState<0|1>(0)
  const [filledFields, setFilledFields] = useState<GridItem>([[undefined, undefined, undefined], [undefined, undefined, undefined],[undefined, undefined, undefined]])

  const onCellClick = (i:number,j:number) => {
    const changedFields = structuredClone(filledFields)
    changedFields[i][j] = user
    setFilledFields(changedFields)
    changeUser((prevUser) => (prevUser === 0 ? 1 : 0));
  }

  console.log({filledFields})


  return (
    <>
      <div className='tic-tac-box'>
        <table>
          <tbody>
            {filledFields.map((row, i) => <tr key={i}>{row.map((column, j) => <td onClick={ () => onCellClick(i,j)} key={j}>{column === undefined ? '': column ? 'O' : 'X'}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
