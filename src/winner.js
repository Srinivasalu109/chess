import { useParams } from "react-router"
import { useHistory } from "react-router"
import "./winner.css"
export const Winner=()=>{
    const history=useHistory()
    const {specialBoard}=useParams()
return(<div className="winnerBoard">
              <h1 className="text">{specialBoard}</h1>
              <button className="replayBtn" onClick={()=>{
                  history.push("/")
              }}>Play Again</button>
    </div>)
}