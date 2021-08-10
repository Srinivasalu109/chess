import { BrowserRouter,Route } from "react-router-dom"
import App from "./App"
import {Winner} from "./winner"
export const Chess=()=>{

    return(<div>
        <BrowserRouter>
<Route path="/" component={App}/>
<Route path="/result/:winner"  component={Winner}/>
</BrowserRouter>
    </div>)
}