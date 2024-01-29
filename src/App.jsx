import { useState } from 'react'
import './App.css'
import { motion } from 'framer-motion'

const titleVariants = {
  initial: {
    y: 50,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 140
    }
  }
}

const textVariants = {
  initial: {
    y: 200,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      delay: 1
    }
  }
}

const gridVariants = {
  initial: {
    x: -50,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

const Square = ({value, onSquareClick}) => {
  return (
    <button 
      className='square'
      onClick={onSquareClick}>{value}</button>
  )
}

const PlayAgain = ({onResetClick}) => {
  return (
    <button className='play-again' onClick={onResetClick}>
      Play Again
    </button>
  )
}

const Board = () => {
  const [click, setClick] = useState(0)
  const [xNext, setXNext] = useState(true)
  // creates an array of 9 elements and sets all to null
  const [squares, setSquares] = useState(Array(9).fill(null))
  const handleClick = (i) => {
    // Non-empty string is considered true in js, empty (null) is considered false
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    // creates a copy of squares with slice, adds X to the i square, and sets squares to the copy
    // we can access outer variables and functions as js has closure
    const nextSquares = squares.slice()
    if (xNext) {
      nextSquares[i] = "X"
    }
    else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares)
    setXNext(!xNext)
    setClick(click + 1)
  }
  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  }
  else if (click === 9) {
    status = "Tie"
  }
  else {
    status = "Next player: " + (xNext ? "X" : "O")
  }
  const handleReset = () => {
    if (status === "Winner: " + winner || status === "Tie") {
      const resetSquares = squares.slice()
      for (let i = 0; i < 9; i++) {
        resetSquares[i] = null
        setSquares(resetSquares)
      setXNext(true)
      setClick(0)
      }
    }
  }
  return (
    <>
      <motion.div className = "status" variants={textVariants} initial='initial' animate='animate'>{status}</motion.div>
      <br></br>
      <motion.div className='grid+button' variants={gridVariants} initial='initial' animate='animate'>
        <motion.div className = "row" variants={gridVariants}>
          {/* creates an arrow function so handleClick is not directly called when code compiles */}
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </motion.div>
        <motion.div className = "row" variants={gridVariants}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </motion.div>
        <motion.div className = "row" variants={gridVariants}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </motion.div>
        <motion.div className="reset" variants={gridVariants}>
          <PlayAgain onResetClick={handleReset}/>
        </motion.div>
      </motion.div>
    </>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const[a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const Game = () => {
  return(
    <>
      <motion.div className='title' variants={titleVariants} initial='initial' animate='animate'>Tic-Tac-Toe</motion.div>
      <div className = "game">
        <div className = "game-board">
          <Board />
        </div>
        {/* This is for a feature where you can view the history of every game. Not yet implemented */}
        {/* <div className='game-info'>
          <ol></ol>
        </div> */}
      </div>
    </>
  )
}

export default Game
