import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Home} from './Pages/Home';
import {Footer} from './components/Footer';
import {NavBar} from './components/NavBar';
import { LoginPage } from './Pages/LoginPage';
import { Profile } from './Pages/Profile';
import './App.css';

import { positions, Provider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
class  App extends Component {

  
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
  fetch("/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
      
}

componentWillMount() {
  this.callAPI();
 
}
  render(){

    
    const options = {
      timeout: 3000,
      position: positions.BOTTOM_RIGHT
    };
    return (
      <Provider template={AlertTemplate} {...options}> 
         <React.Fragment >
          <NavBar />
          
  
          <Router basename={process.env.PUBLIC_URL}>
                
                       <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/Login" component={LoginPage} />
                            <Route exact path="/Profile" component={Profile} />
                        </Switch>

                  
            </Router>
           
         <Footer />
          
       </React.Fragment> 
     </Provider>
    );
  }
  }


export default App;