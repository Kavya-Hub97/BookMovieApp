import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route} from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";



export default function Controller(){
  let baseUrl = "http://localhost:8085/api/v1/";
    return(
      <Router>
         <div className="main-container">

             <Route exact path='/'  > <Home baseUrl = {baseUrl} /> </Route>
             <Route path='/movie/:id'>  <Details baseUrl = {baseUrl} />  </Route>
             <Route path='/bookshow/:id'>  <BookShow baseUrl = {baseUrl} />  </Route>
             <Route path='/confirm/:id' > <Confirmation baseUrl = {baseUrl}  /> </Route>


         </div>
      </Router>
    )
}
