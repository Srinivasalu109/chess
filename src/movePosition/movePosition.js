const white_coins=["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙"]
const black_coins=["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟"]
const movePosition=(i,j,m,n,board,currentPlayer)=>{
  console.log(board)
  if(currentPlayer==="black_player"){
    if(board[m][n]==="♕"){
      board[m][n]=board[i][j]
      board[i][j]=" "
      return("black wins")
    }
  }
 else{
   if(board[m][n]==="♛"){
    board[m][n]=board[i][j]
    board[i][j]=" "
     return("white wins")
   }
 }
  board[m][n]=board[i][j]
  board[i][j]=" "
  return(board)
}
export {movePosition,white_coins,black_coins}