import { white_coins, black_coins } from "../movePosition/movePosition"
const board = [["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],]
const empty_board = [[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],]
const checkblackORwhite = (player, i, j, newBoard) => {
  if (player === "black_player") {
    var coin = white_coins.filter(coin => coin === newBoard[i][j])
    if (coin.length)
      return true
    else
      return false
  }
  else {
    var coin = black_coins.filter(coin => coin === newBoard[i][j])
    if (coin.length)
      return true
    else
      return false

  }
}
const getPossibilitiesforSoldier = (i, j, newBoard, currentPlayer) => {
  let getpossibities = []
  getpossibities.push([i, j])
  if (currentPlayer === "black_player") {
    if (newBoard[i - 1 < 0 ? i : i - 1][j] === " " && i - 1 >= 0) {
      getpossibities.push([i - 1, j])
    }
    if (newBoard[i - 1 < 0 ? i : i - 1][j + 1] !== " " && i - 1 >= 0 && j + 1 <= 7) {
      let isWhiteCoin = white_coins.filter(coin => coin === newBoard[i - 1][j + 1])
      if (isWhiteCoin.length)
        getpossibities.push([i - 1, j + 1])
    }
    if (newBoard[i - 1 < 0 ? i : i - 1][j - 1] !== " " && i - 1 >= 0 && j - 1 >= 0) {
      let isWhiteCoin = white_coins.filter(coin => coin === newBoard[i - 1][j - 1])
      if (isWhiteCoin.length)
        getpossibities.push([i - 1, j - 1])
    }
    return (getpossibities)
  }
  else if (currentPlayer === "white_player") {
    if (newBoard[i + 1 > 7 ? i : i + 1][j] === " " && i + 1 <= 7) {
      getpossibities.push([i + 1, j])
    }
    if (newBoard[i + 1 > 7 ? i : i + 1][j + 1] !== " " && j + 1 <= 7 && i + 1 <= 7) {
      let isBlackCoin = black_coins.filter(coin => coin === newBoard[i + 1][j + 1])
      if (isBlackCoin.length)
        getpossibities.push([i + 1, j + 1])
    }
    if (newBoard[i + 1 > 7 ? i : i + 1][j - 1] !== " " && j - 1 >= 0 && i + 1 <= 7) {
      let isBlackCoin = black_coins.filter(coin => coin === newBoard[i + 1][j - 1])
      if (isBlackCoin.length) {
        getpossibities.push([i + 1, j - 1])
      }
    }
  }
  return (getpossibities)

}
const getPossibilitiesforElephant = (m, n, newBoard, currentPlayer) => {
  let possibilities = [], directions = ["left", "right", "top", "down"], k, canStop, i, j
  possibilities.push([m, n])
  for (k = 0; k < directions.length; k++) {
    i = m
    j = n
    canStop = true
    while (canStop) {
      switch (directions[k]) {
        case "left":
          if (newBoard[i][j - 1 < 0 ? j : j - 1] === " ")
            possibilities.push([i, j - 1 < 0 ? j : j - 1])
          else if (newBoard[i][j - 1 < 0 ? j : j - 1] !== " ") {
            var isValidPosition = checkblackORwhite(currentPlayer, i, j - 1 < 0 ? j : j - 1, newBoard)
            if (isValidPosition) {
              possibilities.push([i, j - 1 < 0 ? j : j - 1])
            }
            canStop = false
            break;

          }
          if (j - 1 < 0) {
            canStop = false
          }
          j--
          break;
        case "right":
          if (newBoard[i][j + 1 > 7 ? j : j + 1] === " ")
            possibilities.push([i, [j + 1 > 7 ? j : j + 1]])
          else if (newBoard[i][j + 1 > 7 ? j : j + 1] !== " ") {
            var isValidPosition = checkblackORwhite(currentPlayer, i, j + 1 > 7 ? j : j + 1, newBoard)
            if (isValidPosition) {
              possibilities.push([i, j + 1 > 7 ? j : j + 1])
            }
            canStop = false

          }
          if (j + 1 > 7) {
            canStop = false
          }
          j++
          break;
        case "top":
          if (newBoard[i - 1 < 0 ? i : i - 1][j] === " ")
            possibilities.push([i - 1 < 0 ? i : i - 1, j])
          else if (newBoard[i - 1 < 0 ? i : i - 1][j] !== " ") {
            var isValidPosition = checkblackORwhite(currentPlayer, i - 1 < 0 ? i : i - 1, j, newBoard)
            if (isValidPosition) {
              possibilities.push([i - 1 < 0 ? i : i - 1, j])
            }
            canStop = false

          }
          if (i - 1 < 0) {
            canStop = false
          }
          i--
          break;
        case "down":
          if (newBoard[i + 1 > 7 ? i : i + 1][j] === " ") {
            possibilities.push([i + 1 > 7 ? i : i + 1, j])
          }
          else if (newBoard[i + 1 > 7 ? i : i + 1][j] !== " ") {
            var isValidPosition = checkblackORwhite(currentPlayer, i + 1 > 7 ? i : i + 1, j, newBoard)
            if (isValidPosition) {
              possibilities.push([i + 1 > 7 ? i : i + 1, j])
            }
            canStop = false


          }


          if (i + 1 > 7) {
            canStop = false
          }
          i++;
          break;
        default:

      }

    }
  }
  return possibilities
}
const getPossibilitiesforCamel = (m, n, newBoard, currentPlayer) => {
  var possibilities = [], canStop = true, directions = ["leftTop", "leftDown", "rightDown", "rightTop"], i, j, k
  possibilities.push([m, n])
  for (k = 0; k < directions.length; k++) {
    i = m
    j = n
    canStop = true
    while (canStop) {
      switch (directions[k]) {
        case "leftTop":
          if (newBoard[i - 1 < 0 ? i : i - 1][j - 1 < 0 ? j : j - 1] === " ") {
            if (i - 1 >= 0 && j - 1 >= 0)
              possibilities.push([i - 1 < 0 ? i : i - 1, j - 1 < 0 ? j : j - 1])
          }
          else if (newBoard[i - 1 < 0 ? i : i - 1][j - 1 < 0 ? j : j - 1] !== " ") {
            if (i - 1 >= 0 && j - 1 >= 0) {
              var isValidPosition = checkblackORwhite(currentPlayer, i - 1 < 0 ? i : i - 1, j - 1 < 0 ? j : j - 1, newBoard)
              if (isValidPosition) {
                possibilities.push([i - 1 < 0 ? i : i - 1, j - 1 < 0 ? j : j - 1])
              }
              canStop = false
            }
          }
          if (j - 1 < 0 || i - 1 < 0) {
            canStop = false
          }
          i--
          j--

          break;
        case "rightDown":
          if (newBoard[i + 1 > 7 ? i : i + 1][j + 1 > 7 ? j : j + 1] === " ") {
            if (i + 1 <= 7 && j + 1 <= 7) {
              possibilities.push([i + 1 > 7 ? i : i + 1, j + 1 > 7 ? j : j + 1])
            }
          }
          else if (newBoard[i + 1 > 7 ? i : i + 1][j + 1 > 7 ? j : j + 1] !== " ") {
            if (i + 1 <= 7 && j + 1 <= 7) {
              var isValidPosition = checkblackORwhite(currentPlayer, i + 1 > 7 ? i : i + 1, j + 1 > 7 ? j : j + 1, newBoard)
              if (isValidPosition) {
                possibilities.push([i + 1 > 7 ? i : i + 1, j + 1 > 7 ? j : j + 1])
              }
              canStop = false



            }
          }
          if (j + 1 > 7 || i + 1 > 7) {
            canStop = false
          }
          i++
          j++
          break;
        case "leftDown":
          if (newBoard[i - 1 < 0 ? i : i - 1][j + 1 > 7 ? j : j + 1] === " ") {
            if (j + 1 <= 7 && i - 1 >= 0)
              possibilities.push([i - 1 < 0 ? i : i - 1, j + 1 > 7 ? j : j + 1])

          }
          else if (newBoard[i - 1 < 0 ? i : i - 1][j + 1 > 7 ? j : j + 1] !== " ") {

            if (i - 1 >= 0 && j + 1 <= 7) {
              var isValidPosition = checkblackORwhite(currentPlayer, i - 1 < 0 ? i : i - 1 , j + 1 > 7 ? j : j + 1, newBoard)
              if (isValidPosition) {
                possibilities.push([i - 1 < 0 ? i : i - 1, j + 1 > 7 ? j : j + 1])
              }
              canStop = false

            }

          }

          if (i - 1 < 0 || j + 1 > 7) {
            canStop = false
          }
          i--
          j++
          break;
        case "rightTop":
          if (newBoard[i + 1 > 7 ? i : i + 1][j - 1 < 0 ? j : j - 1] === " ") {
            if (i + 1 <= 7 && j - 1 >= 0)
              possibilities.push([i + 1 > 7 ? i : i + 1, j - 1 < 0 ? j : j - 1])
          }

          else if (newBoard[i + 1 > 7 ? i : i + 1][j - 1 < 0 ? j : j - 1] !== " ") {
            if (i + 1 <= 7 && j - 1 >= 0) {
              var isValidPosition = checkblackORwhite(currentPlayer, i + 1 > 7 ? i : i + 1, j - 1 < 0 ? j : j - 1, newBoard)
              if (isValidPosition) {
                possibilities.push([i + 1 > 7 ? i : i + 1, j - 1 < 0 ? j : j - 1])
              }
              canStop = false


            }
          }
          if (i + 1 > 7 || j - 1 < 0) {
            canStop = false
          }
          i++
          j--
          break;
        default:

      }
    }
  }
  return possibilities

}
const getPossibilitiesforHorse = (i, j, newBoard, currentPlayer) => {
  let possibilities = [], k, canStop, m, n, l, positions = [[i - 2 < 0 ? i : i - 2, j - 1 < 0 ? j : j - 1], [i - 2 < 0 ? i : i - 2, j + 1 > 7 ? j : j + 1], [i - 1 < 0 ? i : i - 1, j - 1 < 0 ? j : j - 2], [i - 1 < 0 ? i : i - 1, j + 2 > 7 ? j : j + 2], [i + 2 > 7 ? i : i + 2, j - 1 < 0 ? j : j - 1], [i + 2 > 7 ? i : i + 2, j + 1 > 7 ? j : j + 1], [i + 1 > 7 ? i : i + 1, j - 2 < 0 ? j : j - 2], [i + 1 > 7 ? i : i + 1, j + 2 > 7 ? j : j + 2]]
  possibilities = [[i - 2 < 0 ? i : i - 2, j - 1 < 0 ? j : j - 1], [i - 2 < 0 ? i : i - 2, j + 1 > 7 ? j : j + 1], [i - 1 < 0 ? i : i - 1, j - 1 < 0 ? j : j - 2], [i - 1 < 0 ? i : i - 1, j + 2 > 7 ? j : j + 2], [i + 2 > 7 ? i : i + 2, j - 1 < 0 ? j : j - 1], [i + 2 > 7 ? i : i + 2, j + 1 > 7 ? j : j + 1], [i + 1 > 7 ? i : i + 1, j - 2 < 0 ? j : j - 2], [i + 1 > 7 ? i : i + 1, j + 2 > 7 ? j : j + 2]]
  let isvalid = [i - 2 < 0 || j - 1 < 0, i - 2 < 0 || j + 1 > 7, i - 1 < 0 || j - 2 < 0, i - 1 < 0 || j + 2 > 7, i + 2 > 7 || j - 1 < 0, i + 2 > 7 || j + 1 > 7, i + 1 > 7 || j - 2 < 0, i + 1 > 7 || j + 2 > 7]
  console.log(possibilities.length, isvalid.length)
  for (k = 0; k < positions.length; k++) {
    canStop = true

    if (newBoard[positions[k][0]][positions[k][1]] !== " ") {
      if (currentPlayer === "black_player") {
        var coin = white_coins.filter(coin => coin === newBoard[positions[k][0]][positions[k][1]])
        if (coin.length === 0) {

          isvalid[k] = true
        }
      }
      else {
        var coin = black_coins.filter(coin => coin === newBoard[positions[k][0]][positions[k][1]])
        if (coin.length == 0) {

          isvalid[k] = true


        }

      }

    }

  }

  let newPossibilities = [];
  for (let x = 0; x < isvalid.length; x++) {
    if (!isvalid[x]) {
      newPossibilities.push(possibilities[x])
    }
  }
  newPossibilities.push([i, j])

  return (newPossibilities)

}
const getPossibilitiesforQueen = (m, n, newBoard, currentPlayer) => {
  let directions = ["left", "right", "top", "down"], k, canStop, i, j
  var elephantPossibities = getPossibilitiesforElephant(m, n, newBoard, currentPlayer)
  var camelPossiblities = getPossibilitiesforCamel(m, n, newBoard, currentPlayer)
  for (let k = 0; k < camelPossiblities.length; k++) {
    elephantPossibities.push(camelPossiblities[k])
  }
  return (elephantPossibities)
}
const getPossibilitiesforKing = (m, n, newBoard, currentPlayer) => {
  let possibilities = [[m + 1 > 7 ? m : m + 1, n], [m - 1 < 0 ? m : m - 1, n], [m, n + 1 > 7 ? n : n + 1], [m, n - 1 < 0 ? n : n - 1], [m + 1 > 7 ? m : m + 1, n + 1 > 7 ? n : n], [m - 1 < 0 ? m : m - 1, n + 1 > 7 ? n : n + 1], [m - 1 < 0 ? m : m - 1, n - 1 < 0 ? n : n - 1], [m + 1 > 7 ? m : m + 1, n - 1 < 0 ? n : n - 1]], k, i, j
  var isvalid = [m + 1 > 7, m - 1 < 0, n + 1 > 7, n - 1 < 0, m + 1 > 7 || n + 1 > 7, m - 1 < 0 || n + 1 > 7, m - 1 < 0 || n - 1 < 0, m + 1 > 7 || n - 1 < 0]
  for (k = 0; k < possibilities.length; k++) {
    if (newBoard[possibilities[k][0]][possibilities[k][1]] !== " ") {
      if (currentPlayer === "black_player") {
        var coin = white_coins.filter(coin => coin === newBoard[possibilities[k][0]][possibilities[k][1]])
        if (coin.length === 0) {

          isvalid[k] = true
        }
      }
      else {
        var coin = black_coins.filter(coin => coin === newBoard[possibilities[k][0]][possibilities[k][1]])
        if (coin.length == 0) {

          isvalid[k] = true

        }

      }
    }

  }
  let newPossibilities = [];
  for (let x = 0; x < isvalid.length; x++) {
    if (!isvalid[x]) {
      newPossibilities.push(possibilities[x])
    }
  }
  newPossibilities.push([m, n])
  return (newPossibilities)
}
const possibilities = (element, i, j, currentPlayer, newBoard) => {
  switch (element) {
    case "♖":
    case "♜":
      var allPossibilities = getPossibilitiesforElephant(i, j, newBoard, currentPlayer)
      break;
    case "♘":
    case "♞":
      var allPossibilities = getPossibilitiesforHorse(i, j, newBoard, currentPlayer)
      break;
    case "♗":
    case "♝":
      var allPossibilities = getPossibilitiesforCamel(i, j, newBoard, currentPlayer)
      break;
    case "♕":
    case "♛":
      var allPossibilities = getPossibilitiesforKing(i, j, newBoard, currentPlayer)
      break;
    case "♔":
    case "♚":
      var allPossibilities = getPossibilitiesforQueen(i, j, newBoard, currentPlayer)
      break;
    case "♙":
    case "♟":
      var allPossibilities = getPossibilitiesforSoldier(i, j, newBoard, currentPlayer)
      break;
    default:

  }
  return (allPossibilities)
}
export { board, possibilities, empty_board }
