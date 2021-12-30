import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import {CourseContextProvider} from './Contexts/CourseContext'
import {AuthenticatedContextProvider} from './Contexts/AuthenticatedContext';
//import {TestContextProvider} from './Contexts/TestContext'

ReactDOM.render(
  
 <CourseContextProvider>
      <AuthenticatedContextProvider>   
          <Router>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </Router>
        
      </AuthenticatedContextProvider>
     </CourseContextProvider>
  ,
  document.getElementById('root')
);

