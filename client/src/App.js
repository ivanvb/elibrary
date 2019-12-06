import React from 'react';
import UserRegister from './UserRegister/UserRegister.screen';
import UserLogin from './UserLogin/UserLogin.screen';
import BookForm from './Shared/forms/Book.form';
import CreateBook from './CreateBook/CreateBook.screen';
import EditBook from './EditBook/EditBook.screen';
import HomeScreen from './HomeScreen/HomeScreen.screen';
import ReadBook from './ReadBook/ReadBook.screen';
import Audio from './AudioComponent/Audio';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile.screen';
import {} from './Shared/context/User.context';

function App() {
  return (
    <div className="App">
      <Router>
          <UserRegister/>
          <UserLogin/>
          <CreateBook/>
          <EditBook _id="5de99ce3fbbd2367fc3dbc5f"/>
          <ReadBook _id="5de99ce3fbbd2367fc3dbc5f"/>
          <Audio url={`/book/audio/5de99ce3fbbd2367fc3dbc5f`}/>
          
          <Switch>
              <Route path="/login" component={UserLogin}/>
              <Route path="/signup" component={UserRegister}/>
              <Route exact path="/myprofile" component={UserProfile}/>
              <Route exact path="/" component={HomeScreen}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
