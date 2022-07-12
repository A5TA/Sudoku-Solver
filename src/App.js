import React, {useEffect, useState} from 'react'
import './index.css'

const App = () => {
  const [squares, setSquares] = useState([])
  // This will reset the game
  useEffect(()=> {
    resetGrid()
    console.log("New Grid Made")
  }, [])

  const resetGrid = () => {
    const newArr = []
    for(let i = 0; i < 81; i++) {
      newArr.push('.')
    }
    setSquares(newArr)
  }

  const handleChange = (e, index) => {
    setSquares([...squares.slice(0, index), e.target.value, ...squares.slice(index + 1)])
  }
  

  const solve = () => {
    const data = []
    for(let i=0; i < squares.length; i++) {
      if (squares[i] === '.') {
        data.push(0)
      } else {
        data.push(Number(squares[i]))
      }
    }
   
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'ENTER KEY HERE', //Get api key from https://rapidapi.com/adhicdm-V-hoiUpTlf8/api/sudoku-solver3/
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
      },
      body: `{"input": [${data}]}`
    };
    
    // console.log(options)
    fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', options)
      .then(response => response.json())
      .then(response => setSquares(response.answer))
      .catch(err => console.error(err));
  }

  return (
    <>
    <div className="title">
      <h1>Sudoku Solver</h1>
    </div>
    <div className="puzzle">
      {squares.map((value, index) => {
          if (
            ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index < 21) ||
            ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index < 27) ||
            ((index % 9 === 3 || index % 9 === 4 || index % 9 === 5) && (index > 27 && index < 53)) ||
            ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index > 53) ||
            ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index > 53)
          ) {
            return (<input key={index} type='number' min='1' max='9' value={value} onChange={(e) => handleChange(e, index)}className='odd-section'></input>)
          } else {
            return (<input key={index} type='number' min='1' max='9' value={value} onChange={(e) => handleChange(e, index)}></input>)
          }
        }
        )
      }
    </div>
    <div className='btn-container'>
    <button className="solve-btn" onClick={solve}>Solve</button>
    <button className="solve-btn" onClick={() => resetGrid()}>Reset</button>
    </div>
    </>
  )
}

export default App