import React, { useEffect, useState } from 'react';
import {auth} from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';


function App() { 

const [firebaseUser,setFirebaseUser] = useState(false)

useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }

    })
},[])

  return firebaseUser !== false ? (    
    <Router>
      <div className="container">  
          <Navbar firebaseUser={firebaseUser} />
          <Switch>
            <Route path="/login" exact>
              <Login/>
            </Route>

            <Route path="/admin" exact>
              <Admin/>
            </Route>
        </Switch>
      </div> 
    </Router>
  ) : (
    <p>Carregando</p>
  )
}

export default App;
