import logo from './logo.svg';
import "./styles/chess.css"
import { useState, useEffect } from "react"
import { board, possibilities, empty_board } from './possibilities/possibilities';
import { movePosition, black_coins, white_coins } from './movePosition/movePosition';
var currentValue_i = "", currentValue_j = "", allPossibilities = [], currentPlayer = "", currenElement, u, v, specialBoard = board
function App() {
  const [gameBoard, setBoard] = useState(specialBoard)
  const [posibility, setPosibility] = useState(empty_board)
  const [winner, setWinner] = useState("")
  const [turn, setTurn] = useState(0)
  const [change, setChange] = useState(0)
  const [triggerUseEffect, setTriggerUseEffect] = useState(0)
  const [flag, setFlag] = useState(false)
  const[isGameOver,setIsGameOver]=useState(false)
  const changePosition = (i, j) => {
    if (i === currentValue_i && j === currentValue_j) {
      setBoard(board)
      console.log("chenges")
      setPosibility([[" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],])
      return;
    }
    specialBoard = movePosition(currentValue_i, currentValue_j, i, j, gameBoard, currentPlayer)
    if (specialBoard === "black wins") {
      setWinner("black wins")
    specialBoard="llll"
      setBoard([["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],])
      setFlag(false)
      setIsGameOver(true)
    }
    else if (specialBoard === "white wins") {
      setWinner("white wins")
      setBoard([["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],])
      setFlag(false)
      setIsGameOver(true)
    }

    setPosibility([[" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],])
    setTurn(turn + 1)
  }
  const handleClick = (element, i, j) => {
    if (!isGameOver) {
      if (turn % 2 === 0) {
        console.log("noentry")
        var checkit = black_coins.filter(coin => coin === element)
        if (checkit.length) {
          currenElement = element
          u = i
          v = j
          currentPlayer = "black_player"
          console.log(empty_board.slice())
          setPosibility([[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],])
          setChange(change + 1)
        }
      }
      else {
        var checkit = white_coins.filter(coin => coin === element)
        if (checkit.length) {
          currenElement = element
          u = i
          v = j
          currentPlayer = "white_player"
          setPosibility([[" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " ", " ", " ", " "],])
          setChange(change + 1)
        }
      }
    }
  }
  useEffect(() => {
    if (flag) {
      currentValue_i = u
      currentValue_j = v
      allPossibilities = possibilities(currenElement, u, v, currentPlayer, gameBoard)
      for (let k = 0; k < allPossibilities?.length; k++) {
        posibility[allPossibilities[k][0]][allPossibilities[k][1]] = "yes"
        setTriggerUseEffect(triggerUseEffect + 1)
      }
      return;
    }
    setFlag(true)
  }, [change,isGameOver])
  return (
    <div  className="board">
      <h3 className="winner">{winner}</h3>
      {gameBoard.map((row, i) => <div key={i} className="displayRow">{
        row.map((col, j) => {
          if ((j + i) % 2 === 0) {
            if (posibility[i][j] === "yes") {
              return <div className="changeColor" onClick={() => changePosition(i, j)} key={j}>{board[i][j]}</div>
            }
            return <div className="board-grid1" onClick={() => handleClick(col, i, j)} key={j}>{board[i][j]}</div>
          }
          else {
            if (posibility[i][j] === "yes") {
              return <div className="changeColor" onClick={() => changePosition(i, j)} key={j}>{board[i][j]}</div>
            }
            return <div className="board-grid2" onClick={() => handleClick(col, i, j)} key={j}>{board[i][j]}</div>
          }
        })
      }
      </div>)
      }
    </div>

  );
}
export default App;
